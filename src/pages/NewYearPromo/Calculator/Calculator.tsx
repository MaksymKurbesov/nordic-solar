import styles from './Calculator.module.scss'
import { ChangeEvent, useRef, useState } from 'react'

const calculateBonus = (value: number): number => {
  const formattedValue = (value * 0.15).toFixed(2)

  return Number(formattedValue)
}

const Calculator = () => {
  const [amount, setAmount] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^\d.]/g, '') // Удаляем всё кроме чисел и точки
    setAmount(rawValue) // Обновляем состояние

    // Устанавливаем каретку перед символом "$" (в конец строки без учета знака $)
    if (inputRef.current) {
      const position = rawValue.length // Каретка в конец введённого значения
      setTimeout(
        () => inputRef.current?.setSelectionRange(position, position),
        0,
      )
    }
  }

  return (
    <div className={styles['calculator-wrapper']}>
      <div className={styles['calculator']}>
        <h2>Узнайте свой бонус сейчас!</h2>
        <p>
          Введите сумму пополнения и узнайте, сколько вы получите с нашим
          новогодним бонусом.
        </p>
        <input
          ref={inputRef}
          value={amount ? `${amount}$` : ''}
          onChange={handleInputChange}
          placeholder={'0.00$'}
          type={'text'}
        />
        {/*<button>Расчитать</button>*/}
      </div>
      <div className={styles['reward']}>
        <p>Ваш бонус составит</p>
        <span>{calculateBonus(Number(amount))}$</span>
      </div>
      <div className={styles['total-reward']}>
        <p>Вы получите</p>
        <span>{Number(amount) + calculateBonus(Number(amount))}$</span>
      </div>
    </div>
  )
}

export default Calculator
