import styles from './SuccessModal.module.scss'
import Image from '@assets/images/registration.webp'
import CheckIcon from '@assets/icons/check.svg?react'
import { NavLink } from 'react-router-dom'

const SuccessModal = () => {
  return (
    <div className={styles['success-modal']}>
      <div className={styles['modal-content']}>
        <img src={Image} alt={''} width={'100%'} height={200} />
        <div className={styles['text']}>
          <h2>
            <span className={styles['check-icon']}>
              <CheckIcon />
            </span>
            Успешная регистрация!
          </h2>
          <p>
            Ваш аккаунт на инвестиционной платформе Nordic Solar <br />
            <span className={styles['green']}>успешно создан</span>.
          </p>
          <p>
            Теперь у вас есть доступ к возможностям инвестирования в проекты,
            способствующие развитию устойчивых и экологически чистых технологий.
          </p>
          <span>
            Добро пожаловать в нашу платформу. Ваша поддержка — это вклад в
            будущее возобновляемых источников энергии.
          </span>
          <NavLink to={'/cabinet/main'} className={styles['cabinet-button']}>
            В кабинет
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default SuccessModal
