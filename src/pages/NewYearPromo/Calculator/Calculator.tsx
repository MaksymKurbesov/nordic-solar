import styles from './Calculator.module.scss'

const Calculator = () => {
  return (
    <div className={styles['calculator']}>
      <h2>Узнайте свой бонус сейчас!</h2>
      <p>
        Введите сумму пополнения и узнайте, сколько вы получите с нашим
        новогодним бонусом.
      </p>
      <input />
      <p></p>
      <button>Пополнить и получить бонус</button>
    </div>
  )
}

export default Calculator
