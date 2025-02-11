import styles from "./SuccessModal.module.scss";
import Image from "@assets/images/registration.webp";
import CheckIcon from "@assets/icons/check.svg?react";
import { NavLink } from "react-router-dom";
import { I18nextProvider, Trans, useTranslation } from "react-i18next";

const SuccessModal = () => {
  const { t, i18n } = useTranslation("login");

  return (
    <I18nextProvider i18n={i18n} defaultNS={"login"}>
      <div className={styles["success-modal"]}>
        <div className={styles["modal-content"]}>
          <img src={Image} alt={""} width={"100%"} height={200} />
          <div className={styles["text"]}>
            <h2>
              <span className={styles["check-icon"]}>
                <CheckIcon />
              </span>
              {t("success_register")}
            </h2>
            <p>
              <Trans
                i18nKey={"modal_title"}
                components={{ 0: <br />, 1: <span className={styles["green"]} /> }}
              />
            </p>
            <p>{t("modal_text1")}</p>
            <span>{t("modal_text2")}</span>
            <NavLink to={"/sign-in"} className={styles["cabinet-button"]}>
              {t("login")}
            </NavLink>
          </div>
        </div>
      </div>
    </I18nextProvider>
  );
};

export default SuccessModal;
