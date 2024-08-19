import styles from "./NextAccrual.module.scss";

const NextAccrual = () => {
  return (
    <div className={styles["next-accrual"]}>
      <h3>Следующее начисление через</h3>
      <div className={styles["timer-wrapper"]}>
        <p className={styles["title"]}>
          Пусть каждая секунда приближает вас к большему!
        </p>
        <div className={styles["timer"]}>
          <div className={styles["days"]}>
            <span>0</span>
            <span>0</span>
            <p>Дней</p>
          </div>
          <div className={styles["hours"]}>
            <span>0</span>
            <span>0</span>
            <p>Часов</p>
          </div>
          <div className={styles["minutes"]}>
            <span>0</span>
            <span>0</span>
            <p>Минут</p>
          </div>
          <div className={styles["seconds"]}>
            <span>0</span>
            <span>0</span>
            <p>Секунд</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextAccrual;
