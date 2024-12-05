import styles from './ConfirmedPopup.module.scss'
import CheckIcon from '@assets/icons/check.svg?react'
import { useNavigate } from 'react-router-dom'

const ConfirmedPopup = () => {
  const navigate = useNavigate()

  return (
    <div className={styles['confirmed-popup']}>
      <div className={styles['popup-content']}>
        <h3>
          <CheckIcon /> <span>Транзакция успешно отправлена!</span>
        </h3>

        <p className={styles['text']}>
          <span>
            Мы хотели бы сообщить вам, что ваша заявка успешно принята и
            находится в обработке.
          </span>
          <span>
            Наши специалисты скоро проверят ваш запрос и проведут необходимые
            действия.
          </span>
        </p>

        {/*<p>*/}
        {/*  Следите за статусом вашей заявки в разделе <span>"Транзакции"</span>.*/}
        {/*</p>*/}
        <div className={styles['buttons']}>
          {/*<button onClick={() => navigate("/cabinet/transactions")}>*/}
          {/*  К транзакциям*/}
          {/*</button>*/}
          <button onClick={() => navigate('/cabinet/main')}>В кабинет</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmedPopup
