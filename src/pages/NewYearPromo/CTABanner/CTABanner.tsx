import styles from './CTABanner.module.scss'

const CtaBanner = () => {
  return (
    <div className={styles['cta-banner']}>
      <h2>Не упустите возможность!</h2>
      <p>Пополняйте счет и получайте бонус до +15% уже сегодня!</p>
      <button>Получить бонус сейчас</button>
    </div>
  )
}

export default CtaBanner
