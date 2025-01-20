import styles from './NextAccrual.module.scss'
import { Timestamp } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { getClosestDeposit } from '@/utils/helpers.tsx'
import { useTimer } from 'react-timer-hook'
import { IDeposit } from '@/interfaces/IUser.ts'

const NextAccrual = ({ deposits }: { deposits: IDeposit[] }) => {
  const [closestDeposit, setClosestDeposit] = useState<{
    deposit: IDeposit
    timeToAccrual: number
  } | null>(null)

  const { seconds, minutes, hours, days, restart } = useTimer({
    expiryTimestamp: new Date(),
    onExpire: () => console.warn('onExpire called'),
  })

  useEffect(() => {
    if (!deposits) return

    const deposit = getClosestDeposit(deposits)
    setClosestDeposit(deposit)
  }, [deposits])

  useEffect(() => {
    if (closestDeposit) {
      const newExpiry = Timestamp.fromMillis(
        closestDeposit.deposit.lastAccrual.toMillis() + 24 * 60 * 60 * 1000,
      ).toDate()

      restart(newExpiry) // Перезапускаем таймер с новым значением
    }
  }, [closestDeposit, restart])

  return (
    <div className={styles['next-accrual']}>
      <h3>Следующее начисление через</h3>
      <div className={styles['timer-wrapper']}>
        <p className={styles['title']}>
          Пусть каждая секунда приближает вас к большему!
        </p>
        <div className={styles['timer']}>
          <div className={styles['days']}>
            <span>{String(days).padStart(2, '0')}</span>
            <p>Дней</p>
          </div>
          <div className={styles['hours']}>
            <span>{String(hours).padStart(2, '0')}</span>
            <p>Часов</p>
          </div>
          <div className={styles['minutes']}>
            <span>{String(minutes).padStart(2, '0')}</span>
            <p>Минут</p>
          </div>
          <div className={styles['seconds']}>
            <span>{String(seconds).padStart(2, '0')}</span>
            <p>Секунд</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NextAccrual
