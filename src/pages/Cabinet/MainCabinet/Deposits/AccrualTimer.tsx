import {useEffect, useState} from "react";

const AccrualTimer = ({ nextAccrual }) => {
  const [timeLeft, setTimeLeft] = useState({hours: 0, minutes: 0, seconds: 0});

  useEffect(() => {
    // Преобразуем nextAccrual из Timestamp в объект Date
    const nextAccrualDate = nextAccrual.toDate();

    // Функция для вычисления оставшегося времени
    const calculateTimeLeft = () => {
      const now = new Date(); // текущее время
      const difference = nextAccrualDate - now; // разница между следующей датой начисления и текущей

      if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({
          hours,
          minutes,
          seconds,
        });
      } else {
        setTimeLeft(null); // Если время начисления наступило, можно обнулить таймер
      }
    };

    // Запускаем таймер с обновлением каждую секунду
    const timer = setInterval(calculateTimeLeft, 1000);

    // Очищаем таймер при размонтировании компонента
    return () => clearInterval(timer);
  }, [nextAccrual]);
  return (

      <p>{`${timeLeft.hours} ч ${timeLeft.minutes} мин ${timeLeft.seconds} сек`}</p>

  );
};

export default AccrualTimer;