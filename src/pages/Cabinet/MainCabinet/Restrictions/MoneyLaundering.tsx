import styles from './Restrictions.module.scss'
import { useState } from 'react'

const MoneyLaundering = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className={`${
        isOpen ? styles['restrictions'] : styles['restrictions-disabled']
      } ${styles['restrictions-warning']} custom-border`}
    >
      <button onClick={() => setIsOpen(false)} className={styles['close']}>
        <span />
        <span />
      </button>
      {/*<img src={Restriction} className={styles["icon"]} alt={""} />*/}
      {/*<p className={styles["title"]}>Уважаемый {userData.nickname},</p>*/}
      <p>
        В рамках наших стандартных процедур внутреннего контроля и мониторинга,
        мы выявили необычную активность в вашем личном кабинете. Зафиксировано
        пополнение и последующий вывод средств в течение 24-х часов, что может
        рассматриваться как потенциально подозрительная операция в контексте мер
        по противодействию отмыванию денег, полученных незаконным путем.
      </p>
      <p>
        Просим вас не беспокоиться по этому поводу. Данная процедура является
        стандартной практикой и направлена на обеспечение безопасности как ваших
        средств, так и нашей компании в целом.
      </p>
      <p>
        В связи с текущей ситуацией, мы вводим дополнительную меру безопасности
        для всех аккаунтов, связанных с вашим через реферальную систему.
      </p>
      <strong className={styles['accounts']}>
        <span> Идентифицированные аккаунты:</span>
        <ul>
          {userData.restrictions.isMoneyLaundering.users.map((user, index) => (
            <li key={user}>
              {user}
              {index ===
              userData.restrictions.isMoneyLaundering.users.length - 1
                ? '.'
                : ','}
            </li>
          ))}
        </ul>
      </strong>
      <p>
        При следующем запросе на вывод средств, вам будет необходимо ввести
        приватный финансовый ключ в соответствующем разделе нашего сайта.
      </p>
      <p>
        Это временная мера, предназначенная для подтверждения легитимности
        финансовых операций и повышения уровня безопасности транзакций.
      </p>
      <p>
        Мы благодарим вас за понимание и сотрудничество в рамках этих
        необходимых процедур.
      </p>
    </div>
  )
}

export default MoneyLaundering
