import styles from './NextAccrual.module.scss'
import { Timestamp } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { formatTimeLeft } from '@/utils/helpers.tsx'

const NextAccrual = ({ lastAccrual }) => {
  const [nextAccrual, setNextAccrual] = useState(null)
  const [timeLeft, setTimeLeft] = useState(0)

  useEffect(() => {
    if (!lastAccrual) return

    const dayInMillis = 24 * 60 * 60 * 1000
    const accrual = lastAccrual.toMillis() + dayInMillis
    setNextAccrual(accrual)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getNextAccrualTime()) // Обновляем каждую секунду
    }, 1000)

    return () => clearInterval(interval) // Чистим таймер при размонтировании
  }, [nextAccrual])

  const getNextAccrualTime = () => {
    if (!nextAccrual) return

    const nextAccrualTimestamp = Timestamp.fromMillis(nextAccrual) // Добавляем 24 часа
    return nextAccrualTimestamp.toMillis() - Date.now() // Вычисляем разницу в миллисекундах
  }

  const { days, hours, minutes, seconds } = formatTimeLeft(timeLeft)

  return (
    <div className={styles['next-accrual']}>
      <h3>Следующее начисление через</h3>
      <div className={styles['timer-wrapper']}>
        <p className={styles['title']}>
          Пусть каждая секунда приближает вас к большему!
        </p>
        <div className={styles['timer']}>
          <div className={styles['days']}>
            <span>{nextAccrual ? String(days).padStart(2, '0') : '00'}</span>
            <p>Дней</p>
          </div>
          <div className={styles['hours']}>
            <span>{nextAccrual ? String(hours).padStart(2, '0') : '00'}</span>
            <p>Часов</p>
          </div>
          <div className={styles['minutes']}>
            <span>{nextAccrual ? String(minutes).padStart(2, '0') : '00'}</span>
            <p>Минут</p>
          </div>
          <div className={styles['seconds']}>
            <span>{nextAccrual ? String(seconds).padStart(2, '0') : '00'}</span>
            <p>Секунд</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NextAccrual
