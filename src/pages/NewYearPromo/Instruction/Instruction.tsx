import styles from './Instruction.module.scss'

const Instruction = () => {
  return (
    <div className={styles['instruction']}>
      <h2>Как это работает?</h2>
      <ul>
        <li className={'green-gradient'}>
          <h3>
            <span>Шаг 1</span>
            Зарегистрируйтесь
          </h3>
          <p>
            Создайте аккаунт на нашей платформе или войдите в личный кабинет.
          </p>
        </li>
        <li className={'green-gradient'}>
          <h3>
            <span>Шаг 2</span>
            Пополните счёт
          </h3>
          <p>Внесите любую сумму на ваш личный счёт.</p>
        </li>
        <li className={'green-gradient'}>
          <h3>
            <span>Шаг 3</span>
            Получите бонус
          </h3>
          <p>Бонус до 15% начисляется автоматически сразу после пополнения.</p>
        </li>
        <li className={'green-gradient'}>
          <h3>
            <span>Шаг 4</span>
            Начните инвестировать
          </h3>
          <p>Выберите экологические проекты и увеличьте свой доход!</p>
        </li>
      </ul>
    </div>
  )
}

export default Instruction
