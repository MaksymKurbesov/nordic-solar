import styles from "./InvalidPrivateKey.module.scss";
import XIcon from "@assets/icons/x.svg?react";
import { useNavigate } from "react-router-dom";

const InvalidPrivateKey = () => {
  const navigate = useNavigate();

  return (
    <div className={styles["invalid-private-key"]}>
      <div className={styles["invalid-private-key-wrapper"]}>
        <h3>
          <XIcon /> <span>Приватный финансовый ключ был введён неверно!</span>
        </h3>
        <div className={styles["text"]}>
          <p>
            Если вы потеряли или забыли свой приватный ключ, воспользуйтесь процедурой восстановления или
            свяжитесь с нашей службой поддержки для дополнительной помощи.
          </p>
        </div>
        <button onClick={() => navigate("/cabinet/main")} className={styles["close-button"]}>
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default InvalidPrivateKey;
