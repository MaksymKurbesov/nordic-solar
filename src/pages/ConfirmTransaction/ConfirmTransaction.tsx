import styles from "./ConfirmTransaction.module.scss";
import CheckIcon from "@assets/icons/check.svg?react";
import CopyIcon from "@assets/icons/copy.svg?react";
import QRCode from "@assets/images/qr.png";
import ConnectionSecured from "@assets/icons/connection-secured.svg?react";
import SFCIcon from "@assets/icons/sfc-energy.svg?react";
import WideButton from "@SharedUI/WideButton/WideButton.tsx";
import { formatDate, generateSixDigitCode } from "@/utils/helpers.ts";
import { ScrollRestoration, useLocation, useNavigate } from "react-router-dom";
import { transactionService } from "@/main.tsx";
import { useUser } from "@/hooks/useUser.ts";
import { useEffect, useState } from "react";
import ConfirmedPopup from "@SharedUI/ConfirmedPopup/ConfirmedPopup.tsx";

const ConfirmTransaction = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state;
  const { user } = useUser();
  const transactionType = formData.type;
  const isDepositType = transactionType === "deposit";

  const [confirmedPopupIsOpen, setConfirmedPopupIsOpen] = useState(false);

  const onSubmitTransaction = async () => {
    await transactionService.addTransaction({
      type: "Пополнение",
      amount: formData.amount,
      nickname: user?.nickname,
      executor: formData.wallet,
    });
    setConfirmedPopupIsOpen(true);
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className={styles["transaction-confirmation"]}>
      <div className={styles["success-notification"]}>
        <CheckIcon />
        <span>Транзакция успешно создана</span>
      </div>
      <div className={styles["columns-wrapper"]}>
        <div className={styles["left-column"]}>
          <p className={styles["title"]}>
            {isDepositType
              ? `Вам был выставлен счет на оплату`
              : `Запрос на вывод средств`}
          </p>
          <span className={styles["invoice-number"]}>
            #{generateSixDigitCode()}
          </span>
          <p className={styles["invoice-subtitle"]}>
            {isDepositType
              ? `Если вы не оплатите заявку, депозит будет автоматически аннулирован`
              : ""}
          </p>

          <p className={styles["title"]}>Транзакция</p>
          <p className={styles["amount"]}>
            {formData.amount} <span>USDT</span>
          </p>
          <span className={styles["amount-subtitle"]}>
            {formData.wallet.toUpperCase()}
          </span>

          {isDepositType && (
            <>
              <p className={styles["title"]}>
                Адрес кошелька ({formData.wallet})
              </p>
              <p className={styles["wallet-address"]}>
                <span>0xf7df72fdsahfbhdsabf8y2870fhdsuahkdf</span> <CopyIcon />
              </p>
            </>
          )}
        </div>
        <div className={styles["right-column"]}>
          <div className={styles["fields"]}>
            <div className={styles["field"]}>
              <span>Статус</span>
              <p>Ожидает</p>
            </div>
            <div className={styles["field"]}>
              <span>Дата</span>
              <p>{formatDate(new Date())}</p>
            </div>
            <div className={styles["field"]}>
              <span>Платежная система</span>
              <p>{formData.wallet.toUpperCase()}</p>
            </div>
            <div className={styles["field"]}>
              <span>Транзакция на</span>
              <p>0xf7df72fdsahfbhdsabf8y2870fhdsuahkdf</p>
            </div>
            <div className={styles["field"]}>
              <span>Сумма</span>
              <p>{formData.amount} USDT</p>
            </div>
          </div>
          <div className={`${styles["qr-code"]}`}>
            <div className={`${!isDepositType ? styles["no-qr-code"] : ""}`}>
              <img src={QRCode} alt={""} width={196} height={196} />
              <p>
                QR-код <br />
                для оплаты
              </p>
            </div>
            <div
              className={`${styles["secure-connection"]} ${!isDepositType ? styles["secure-connection-withdrawn"] : ""}`}
            >
              <ConnectionSecured />
              <p>
                Соединение <br />
                защищено
              </p>
              <SFCIcon />
            </div>
          </div>
          <p className={styles["disclaimer"]}>
            {isDepositType
              ? `Убедитесь что вы отправляете именно то количество монет, которое
              указано. Обратите внимание что это уникальный адрес кошелька, После
              завершения операции не используйте этот адрес для последующих
              платежей.`
              : `Проверьте, что вы вводите правильную сумму для вывода.
              Пожалуйста, удостоверьтесь, что все данные верны перед
              подтверждением транзакции.`}
          </p>
          <div className={styles["buttons"]}>
            <WideButton
              onClickHandler={onSubmitTransaction}
              text={isDepositType ? "Я заплатил" : "Подтвердить"}
              isCheckButton
            />

            <WideButton
              onClickHandler={() => {
                navigate(-1);
              }}
              text={"Отмена"}
              isTransparent
              isCancelButton
            />
          </div>
        </div>
      </div>
      {confirmedPopupIsOpen && <ConfirmedPopup />}
      <ScrollRestoration />
    </div>
  );
};

export default ConfirmTransaction;
