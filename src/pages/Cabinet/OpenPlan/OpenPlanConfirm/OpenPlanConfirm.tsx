import styles from './OpenPlanConfirm.module.scss'
import { useFormContext } from 'react-hook-form'
import { calculateDailyIncome, calculateTotalIncome } from '@/utils/helpers'
import { PLAN_VARIANT } from '@/utils/const.tsx'
import IconCircleCheckFilled from '@/assets/icons/circle-check.svg?react'
import QuestionIcon from '@/assets/icons/help-octagon.svg?react'
import IconChevronRight from '@/assets/icons/chevron-right.svg?react'

const PLAN_MAP = {
  solar: 'Solar Future',
  wind: 'Wind Prosperity',
  hydro: 'Hydro PowerEdge',
  hydrogen: 'Hydrogen Horizons',
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
      <div className={styles['row']}>
        <span className={styles['icon']}>
          <IconCircleCheckFilled width={35} height={35} color={'#14CC74'} />
        </span>
        <p className={styles['success-transaction']}>
          Транзакция успешно создана!
        </p>
        <p className={styles['amount']}>USD {Number(amount).toFixed(2)}</p>
      </div>
      <div className={`${styles['row']} ${styles['receipt']}`}>
        <p>
          <span>План:</span>
          <span> {PLAN_MAP[selectedPlan]}</span>
        </p>
        <p>
          <span>Тип плана:</span> <span>{variant.type}</span>
        </p>
        <p className={styles['wallet']}>
          <span>Кошелёк:</span> <span>{selectedWallet}</span>
        </p>
        <p className={styles['amount-receipt']}>
          <span>Сумма:</span> <span>${amount}</span>
        </p>
        <p>
          <span>Доход в день:</span>
          <span>${calculateDailyIncome(amount, variant.inDay)}</span>
        </p>
        <p className={styles['total-income']}>
          <span>Общий доход:</span>
          <span>
            ${calculateTotalIncome(amount, variant.inDay, variant.days)}
          </span>
        </p>
        <p>
          <span>Дата:</span> <span>24/09/2024</span>
        </p>
      </div>
      <div className={`${styles['row']} ${styles['trouble']}`}>
        <QuestionIcon width={30} height={30} />
        <p>
          <span>Проблемы с оплатой?</span>
          <span>Дайте нам знать!</span>
        </p>
        <span className={styles['chevron']}>
          <IconChevronRight />
        </span>
      </div>
    </div>
  )
}

export default OpenPlanConfirm
