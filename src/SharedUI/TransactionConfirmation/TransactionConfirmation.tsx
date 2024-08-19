import styles from "./TransactionConfirmation.module.scss";
import CheckIcon from "@assets/icons/check.svg?react";
import CopyIcon from "@assets/icons/copy.svg?react";
import QRCode from "@assets/images/qr.png";
import ConnectionSecured from "@assets/icons/connection-secured.svg?react";
import SFCIcon from "@assets/icons/sfc-energy.svg?react";
import WideButton from "@SharedUI/WideButton/WideButton.tsx";

const TransactionConfirmation = () => {
  return (
    <div className={styles["transaction-confirmation"]}>
      <div className={styles["success-notification"]}>
        <CheckIcon />
        <span>Транзакция успешно создана</span>
      </div>
      <div className={styles["columns-wrapper"]}>
        <div className={styles["left-column"]}>
          <p className={styles["title"]}>Вам был выставлен счет на оплату</p>
          <span className={styles["invoice-number"]}>#110024</span>
          <p className={styles["invoice-subtitle"]}>
            Если вы не оплатите заявку, депозит будет автоматически аннулирован
          </p>

          <p className={styles["title"]}>Транзакция</p>
          <p className={styles["amount"]}>
            1 244 <span>USDT</span>
          </p>
          <span className={styles["amount-subtitle"]}>Tether USDT</span>

          <p className={styles["title"]}>Адрес кошелька (Tether USDT)</p>
          <p className={styles["wallet-address"]}>
            0xf7df72fdsahfbhdsabf8y2870fhdsuahkdf <CopyIcon />
          </p>
        </div>
        <div className={styles["right-column"]}>
          <div className={styles["fields"]}>
            <div className={styles["field"]}>
              <span>Статус</span>
              <p>Ожидает</p>
            </div>
            <div className={styles["field"]}>
              <span>Дата</span>
              <p>12.07.2024 15:34</p>
            </div>
            <div className={styles["field"]}>
              <span>Платежная система</span>
              <p>TRC20 Tether</p>
            </div>
            <div className={styles["field"]}>
              <span>Транзакция на</span>
              <p>0xf7df72fdsahfbhdsabf8y2870fhdsuahkdf</p>
            </div>
            <div className={styles["field"]}>
              <span>Сумма</span>
              <p>1 244 USDT</p>
            </div>
          </div>
          <div className={styles["qr-code"]}>
            <img src={QRCode} alt={""} width={196} height={196} />
            <p>
              QR-код <br />
              для оплаты
            </p>
            <div className={styles["secure-connection"]}>
              <ConnectionSecured />
              <p>
                Соединение <br />
                защищено
              </p>
              <SFCIcon />
            </div>
          </div>
          <p className={styles["disclaimer"]}>
            Убедитесь что вы отправляете именно то количество монет, которое
            указано. Обратите внимание что это уникальный адрес кошелька, После
            завершения операции не используйте этот адрес для последующих
            платежей
          </p>
          <div className={styles["buttons"]}>
            <WideButton text={"Я заплатил"} isCheckButton />
            <WideButton text={"Отмена"} isTransparent isCancelButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionConfirmation;
