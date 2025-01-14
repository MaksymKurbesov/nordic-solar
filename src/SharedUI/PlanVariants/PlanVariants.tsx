import styles from './PlanVariants.module.scss'
import GeoIcon from '@assets/icons/geo.svg?react'
import MoneyIcon from '@assets/icons/money.svg?react'
import { useEffect, useState } from 'react'
import { PLAN_VARIANT } from '@/utils/const.tsx'

const PlanVariants = ({ register, selectedPlan, selectedVariant }) => {
  const [variants, setVariants] = useState(null)

  useEffect(() => {
    setVariants(PLAN_VARIANT[selectedPlan])
  }, [])

  if (!variants) return

  return (
    <ul className={styles['plans-list']}>
      {Object.entries(variants).map((plan) => {
        const variantName = plan[0]
        const variant = plan[1]

        return (
          <li
            key={variantName}
            className={`${selectedVariant === variantName ? styles['active'] : ''}`}
          >
            {register && (
              <input
                value={variantName}
                id={variantName}
                type={'radio'}
                {...register('variant')}
              />
            )}
            <label htmlFor={variantName}>
              <p className={styles['plan-name']}>{variant.type}</p>
              <div className={styles['plan-row']}>
                <div className={styles['region']}>
                  <span>
                    <GeoIcon height={18} /> Регион
                  </span>
                  <p>{variant.region}</p>
                </div>
                <div className={styles['accruals']}>
                  <span>
                    <MoneyIcon height={18} />
                    Начисления
                  </span>
                  <p>{variant.accruals}</p>
                </div>
              </div>
              <div className={styles['plan-row']}>
                <div>
                  <span>В день</span>
                  <p>{variant.inDay ? `${variant.inDay}%` : 'Индивидуально'}</p>
                </div>
                <div>
                  <span>Дней</span>
                  <p>{variant.days}</p>
                </div>
                <div>
                  <span>Мин. депозит</span>
                  <p>${variant.minDeposit}</p>
                </div>
                <div>
                  <span>Макс. депозит</span>
                  <p>${variant.maxDeposit === -1 ? '∞' : variant.maxDeposit}</p>
                </div>
              </div>
            </label>
          </li>
        )
      })}
    </ul>
  )
}

export default PlanVariants
