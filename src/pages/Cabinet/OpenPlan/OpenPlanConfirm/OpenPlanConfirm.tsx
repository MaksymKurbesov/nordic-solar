import styles from './OpenPlanConfirm.module.scss'
import { useFormContext } from 'react-hook-form'

import { calculateDailyIncome, calculateTotalIncome } from '@/utils/helpers'
import { PLAN_VARIANT } from '@/utils/const.tsx'

const PLAN_MAP = {
  individual: 'Индивидуальные инвестиционные планы',
  'mutual-fonds': 'Взаимные фонды зеленой энергетики',
  crowdfunding: 'Программы коллективных инвестиций (Crowdfunding)',
  pension: 'Пенсионные инвестиционные планы',
}

const OpenPlanConfirm = () => {
  const { watch } = useFormContext()

  const selectedPlan = watch('plan')
  // const plan = PLANS.find(plan => plan.value === selectedPlan);

  const selectedVariant = watch('variant')
  const variant = PLAN_VARIANT[selectedPlan][selectedVariant]
  const selectedWallet = watch('wallet')
  const amount = watch('amount')

  return (
    <div className={styles['open-plan-confirm']}>
      <p>
        <span>План:</span> {PLAN_MAP[selectedPlan]}
      </p>
      <p>
        <span>Тип плана:</span> {variant.type}
      </p>
      <p>
        <span>Кошелёк:</span> {selectedWallet.toUpperCase()}
      </p>
      <p>
        <span>Сумма:</span> ${amount}
      </p>
      <p>
        <span>Доход в день:</span> $
        {calculateDailyIncome(amount, variant.inDay)}
      </p>
      <p>
        <span>Общий доход:</span> $
        {calculateTotalIncome(amount, variant.inDay, variant.days)}
      </p>
      <p>
        <span>Дата:</span> 24/09/2024
      </p>
    </div>
  )
}

export default OpenPlanConfirm
