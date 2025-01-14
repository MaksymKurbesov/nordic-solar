import { useTimer } from 'react-timer-hook'
import { Timestamp } from 'firebase/firestore'
import { FC } from 'react'

interface IAccrualTimer {
  nextAccrual: Timestamp
}

const AccrualTimer: FC<IAccrualTimer> = ({ nextAccrual }) => {
  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp: nextAccrual.toDate(),
    onExpire: () => console.warn('onExpire called'),
  })

  return <p>{`${hours} ч ${minutes} мин ${seconds} сек`}</p>
}

export default AccrualTimer
