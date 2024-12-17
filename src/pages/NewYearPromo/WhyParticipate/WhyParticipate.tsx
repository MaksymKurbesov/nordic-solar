import styles from './WhyParticipate.module.scss'
import ParticipateIcon1 from '../icons/participate1.svg?react'
import ParticipateIcon2 from '../icons/participate2.svg?react'
import ParticipateIcon3 from '../icons/participate3.svg?react'
import ParticipateIcon4 from '../icons/participate4.svg?react'

const WhyParticipate = () => {
  return (
    <div className={styles['why-participate']}>
      <h2>Почему стоит участвовать в акции?</h2>
      <ul>
        <li>
          <ParticipateIcon1 width={50} height={50} />
          <div>
            <h3>Дополнительная прибыль</h3>
            <p>Получайте до +15% к сумме пополнения на ваш личный счёт.</p>
          </div>
        </li>
        <li>
          <ParticipateIcon2 width={50} height={50} />
          <div>
            <h3>Экологически чистое будущее</h3>
            <p>
              Ваши инвестиции поддерживают проекты в области зеленой энергетики.
            </p>
          </div>
        </li>
        <li>
          <ParticipateIcon3 width={50} height={50} />
          <div>
            <h3>Простые условия участия</h3>
            <p>
              Зарегистрируйтесь, пополните счёт и получите бонус автоматически.
            </p>
          </div>
        </li>
        <li>
          <ParticipateIcon4 width={50} height={50} />
          <div>
            <h3>Ограниченное предложение </h3>
            <p>
              Акция действует до 31 января 2024 года — не упустите возможность!
            </p>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default WhyParticipate
