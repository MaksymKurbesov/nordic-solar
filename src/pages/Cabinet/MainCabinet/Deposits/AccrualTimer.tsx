import { useTimer } from 'react-timer-hook'

const AccrualTimer = ({ nextAccrual }) => {
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp: nextAccrual.toDate(),
    onExpire: () => console.warn('onExpire called'),
  })

  return <p>{`${hours} ч ${minutes} мин ${seconds} сек`}</p>
}

export default AccrualTimer
