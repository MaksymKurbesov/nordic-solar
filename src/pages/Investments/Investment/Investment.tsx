import styles from './Investment.module.scss'
import WideButton from '@SharedUI/WideButton/WideButton'
import PlanVariants from '@SharedUI/PlanVariants/PlanVariants'
import ContactUs from '@SharedUI/ContactUs/ContactUs'
import { ScrollRestoration, useLocation, useNavigate } from 'react-router-dom'
import { INVESTMENTS } from '@/utils/INVESTMENTS'

const getPlanValue = (value) => {
  return value.split('-')[0]
}

const Investment = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const productName = location.pathname.split('/')[2]
  const investment = INVESTMENTS.find((product) => product.link === productName)
  const { title, subtitle, heroImage, mainText, subText } = investment
  const planValue = getPlanValue(productName)

  return (
    <div className={`${styles['investment']} container`}>
      <button
        onClick={() => navigate('/investments')}
        className={styles['back-button']}
      >
        Назад
      </button>
      <h2 className={'page-title'}>{title}</h2>
      <WideButton text={'Обсудить план'} />
      <p className={styles['subtitle']}>{subtitle}</p>
      <img
        src={heroImage}
        alt={''}
        width={'100%'}
        className={styles['hero-image']}
      />
      <div className={styles['text']}>
        <p className={styles['individual-plans-text']}>{mainText}</p>
        <div className={styles['individual-plans-text2']}>{subText}</div>
      </div>
      <div className={styles['plans']}>
        <h4>Варианты доступных планов</h4>
        <PlanVariants selectedPlan={planValue} />
      </div>
      <ContactUs />
      <ScrollRestoration />
    </div>
  )
}

export default Investment
