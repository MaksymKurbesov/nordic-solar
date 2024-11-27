import styles from './Plans.module.scss'
import { useFormContext } from 'react-hook-form'
import { NavLink } from 'react-router-dom'
import { INVESTMENTS } from '@/utils/INVESTMENTS.tsx'

const Plans = () => {
  const { register, watch } = useFormContext()
  const selectedPlan = watch('plan')

  return (
    <div className={styles['plans-list-wrapper']}>
      <ul className={styles['plans-list']}>
        {INVESTMENTS.map((plan, index) => {
          return (
            <li
              key={index}
              className={`${selectedPlan === plan.value ? styles['active'] : ''}`}
            >
              <input
                value={plan.value}
                id={plan.value}
                type={'radio'}
                {...register('plan', {
                  required: 'Выберите план',
                })}
              />
              <label htmlFor={plan.value} className={styles['plan-text']}>
                <img src={plan.thumbImage} alt={''} />
                <p>{plan.title}</p>
                <NavLink
                  target={'_blank'}
                  to={`/investments/${plan.link}`}
                  className={styles['more-button']}
                >
                  Подробнее
                </NavLink>
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Plans
