import styles from "./ConfirmedPopup.module.scss";
import CheckIcon from "@assets/icons/check.svg?react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ConfirmedPopup = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("confirmTransaction");

  return (
    <div className={styles["confirmed-popup"]}>
      <div className={styles["popup-content"]}>
        <h3>
          <CheckIcon /> <span>{t("success_transaction")}</span>
        </h3>

        <p className={styles["text"]}>
          <span>{t("modal_text1")}</span>
          <span>{t("modal_text2")}</span>
        </p>

        <div className={styles["buttons"]}>
          <button onClick={() => navigate("/cabinet/main")}>{t("to_cabinet")}</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmedPopup;
