import styles from './Calculator.module.scss'

const Calculator = () => {
  return (
    <div className={styles['calculator-wrapper']}>
      <div className={styles['calculator']}>
        <h2>Узнайте свой бонус сейчас!</h2>
        <p>
          Введите сумму пополнения и узнайте, сколько вы получите с нашим
          новогодним бонусом.
        </p>
        <input placeholder={'0.00$'} type={'text'} />
        <button>Расчитать</button>
      </div>
      <div className={styles['reward']}>
        <p>Ваш бонус составит</p>
        <span>254$</span>
      </div>
    </div>
  )
}

export default Calculator
