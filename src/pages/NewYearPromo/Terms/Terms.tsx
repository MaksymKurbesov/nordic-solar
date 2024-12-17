import styles from './Terms.module.scss'

const Terms = () => {
  return (
    <div className={styles['terms']}>
      <ul>
        <li>Акция действует с 19 декабря по 7 января 2025 года.</li>
        <li>Бонус до 15% начисляется при любом пополнении счета.</li>
        <li>Минимальная сумма пополнения — указать сумму.</li>
        <li>Бонус может быть выведен вместе с основной суммой депозита.</li>
      </ul>
    </div>
  )
}

export default Terms
