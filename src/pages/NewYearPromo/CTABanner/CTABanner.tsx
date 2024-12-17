import styles from './CTABanner.module.scss'
import { useNavigate } from 'react-router-dom'

const CtaBanner = ({ user }) => {
  const navigate = useNavigate()

  const clickHeroButtonHandler = () => {
    if (user) {
      navigate('/cabinet/make-deposit')
    } else {
      navigate('/sign-in')
    }
  }

  return (
    <div className={styles['cta-banner']}>
      <h2>Не упустите возможность!</h2>
      <p>Пополняйте счет и получайте бонус до +15% уже сегодня!</p>
      <button onClick={clickHeroButtonHandler}>Получить бонус сейчас</button>
    </div>
  )
}

export default CtaBanner
