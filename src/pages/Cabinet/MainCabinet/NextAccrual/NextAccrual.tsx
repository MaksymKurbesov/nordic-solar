import styles from "./NextAccrual.module.scss";
import { Timestamp } from "firebase/firestore";
import { useState, useEffect } from "react";

const NextAccrual = ({ nextAccrual }) => {

  console.log(nextAccrual, 'nextAccrual')

  const getNextAccrualTime = () => {
    const nextAccrualTimestamp = Timestamp.fromMillis(
      nextAccrual
    ); // Добавляем 24 часа
    return nextAccrualTimestamp.toMillis() - Date.now(); // Вычисляем разницу в миллисекундах
  };

  const [timeLeft, setTimeLeft] = useState(getNextAccrualTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getNextAccrualTime()); // Обновляем каждую секунду
    }, 1000);

    return () => clearInterval(interval); // Чистим таймер при размонтировании
  }, [nextAccrual]);

  // Функция для преобразования миллисекунд в дни, часы, минуты и секунды
  const formatTimeLeft = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds };
  };

  const { days, hours, minutes, seconds } = formatTimeLeft(timeLeft);

  return (
    <div className={styles["next-accrual"]}>
      <h3>Следующее начисление через</h3>
      <div className={styles["timer-wrapper"]}>
        <p className={styles["title"]}>
          Пусть каждая секунда приближает вас к большему!
        </p>
        <div className={styles["timer"]}>
          <div className={styles["days"]}>
            <span>{nextAccrual ? String(days).padStart(2, '0') : "00"}</span>
            <p>Дней</p>
          </div>
          <div className={styles["hours"]}>
            <span>{nextAccrual ? String(hours).padStart(2, '0') : "00"}</span>
            <p>Часов</p>
          </div>
          <div className={styles["minutes"]}>
            <span>{nextAccrual ? String(minutes).padStart(2, '0') : "00"}</span>
            <p>Минут</p>
          </div>
          <div className={styles["seconds"]}>
            <span>{nextAccrual ? String(seconds).padStart(2, '0') : "00"}</span>
            <p>Секунд</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextAccrual;