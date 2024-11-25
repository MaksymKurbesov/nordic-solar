import styles from './OpenPlan.module.scss'
import { FormProvider, useForm } from 'react-hook-form'
import { ScrollRestoration } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { depositService } from '@/main.tsx'
import ConfirmedPopup from '@SharedUI/ConfirmedPopup/ConfirmedPopup'
import { calculateTotalIncome } from '@/utils/helpers'
import { PLAN_VARIANT } from '@SharedUI/PlanVariants/PlanVariants'
import { useUser } from '@/hooks/useUser'
import { Box } from '@mui/material'
import Plans from '@/pages/Cabinet/OpenPlan/Plans/Plans'
import WalletAmount from '@/pages/Cabinet/OpenPlan/WalletAmount/WalletAmount'
import Variants from '@/pages/Cabinet/OpenPlan/Variants/Variants'
import OpenPlanConfirm from '@/pages/Cabinet/OpenPlan/OpenPlanConfirm/OpenPlanConfirm'

import MyStepper from '@/pages/Cabinet/OpenPlan/Stepper'
import NavigationButtons from '@/pages/Cabinet/OpenPlan/NavigationButtons'
import { createPortal } from 'react-dom'

const steps = [
  {
    title: 'Тип плана',
    // component: <Plans />,
    component: <Plans />,
    type: 'plan',
  },
  {
    title: 'Вариант плана',
    component: <Variants />,
    type: 'variant',
  },
  {
    title: 'Сумма и кошелёк',
    component: <WalletAmount />,
    type: 'wallet',
  },
  {
    title: 'Подтверждение',
    component: <OpenPlanConfirm />,
    type: 'final',
  },
]

const OpenPlan = () => {
  const { user } = useUser()
  const [confirmPopupIsOpen, setConfirmPopupIsOpen] = useState(false)

  const [activeStep, setActiveStep] = useState(0)

  const [error, setError] = useState(null)

  const form = useForm({
    defaultValues: {
      plan: '',
      variant: '',
      amount: 0,
      wallet: '',
    },
    mode: 'onChange',
  })

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'visible'
    }
  }, [])

  const submitHandler = async ({
    amount,
    variant,
    plan,
    wallet,
    selectedVariant,
  }) => {
    const willReceived = Number(
      calculateTotalIncome(amount, variant.inDay, variant.days),
    )

    const depositData = {
      amount,
      plan,
      variant: selectedVariant,
      days: variant.days,
      inDay: variant.inDay,
      wallet,
      willReceived,
    }
    window.scrollTo(0, 0)
    setConfirmPopupIsOpen(true)
    document.body.style.overflow = 'hidden'
    return await depositService.openPlan(user.nickname, depositData)
  }

  const handleNext = () => {
    const stepType = steps[activeStep].type
    const currentValue = form.watch(stepType)
    const wallet = form.watch('wallet')
    const amount = form.watch('amount')
    const selectedVariant = form.watch('variant')
    const plan = form.watch('plan')

    if (activeStep === 2 && wallet) {
      const variant = PLAN_VARIANT[plan][selectedVariant]
      const userBalance = user?.wallets[wallet].available

      if (userBalance < amount || amount < variant.minDeposit) return
    }

    if (activeStep === steps.length - 1) {
      const variant = PLAN_VARIANT[plan][selectedVariant]
      submitHandler({ amount, variant, plan, wallet, selectedVariant })
    }

    if (!currentValue) return

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <h2>Открыть план</h2>
      <MyStepper steps={steps} activeStep={activeStep} />
      <div className={styles['open-plan']}>
        <FormProvider {...form}>{steps[activeStep].component}</FormProvider>
        {confirmPopupIsOpen && createPortal(<ConfirmedPopup />, document.body)}
        <ScrollRestoration />
      </div>
      {!error && (
        <p className={styles['error-message']}>Тестовое еррор сообщение</p>
      )}
      <NavigationButtons
        activeStep={activeStep}
        handleBack={handleBack}
        handleNext={handleNext}
        steps={steps}
      />
    </Box>
  )
}

export default OpenPlan
