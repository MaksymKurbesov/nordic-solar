import styles from './Instruction.module.scss'
import Pattern1 from '@assets/images/new-year-promo/pattern1.svg'
import Pattern2 from '@assets/images/new-year-promo/pattern2.svg'
import Pattern3 from '@assets/images/new-year-promo/pattern3.svg'
import Pattern4 from '@assets/images/new-year-promo/pattern4.svg'

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
          <img src={Pattern1} />
        </li>
        <li className={`green-gradient`}>
          <h3>
            <span>Шаг 2</span>
            Пополните счёт
          </h3>
          <p>
            Внесите минимальную сумму для участия в акции на ваш личный счёт с
            указанием промокода.
          </p>
          <img src={Pattern2} />
        </li>
        <li className={'green-gradient'}>
          <h3>
            <span>Шаг 3</span>
            Получите бонус
          </h3>
          <p>Бонус до 15% начисляется автоматически сразу после пополнения.</p>
          <img src={Pattern3} />
        </li>
        <li className={'green-gradient'}>
          <h3>
            <span>Шаг 4</span>
            Начните инвестировать
          </h3>
          <p>Выберите экологические проекты и увеличьте свой доход!</p>
          <img src={Pattern4} />
        </li>
      </ul>
    </div>
  )
}

export default Instruction
