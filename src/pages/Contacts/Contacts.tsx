import styles from "./Contacts.module.scss";
import Map from "@assets/images/map.png";
import WideButton from "@SharedUI/WideButton/WideButton.tsx";
import Input from "@SharedUI/Input/Input.tsx";
import { ScrollRestoration } from "react-router-dom";
import { I18nextProvider, Trans, useTranslation } from "react-i18next";

const Contacts = () => {
  const { t, i18n } = useTranslation("contacts");

  return (
    <I18nextProvider i18n={i18n} defaultNS={"contacts"}>
      <div className={`${styles["contacts"]} container`}>
        <h2>
          <Trans i18nKey="title" components={{ span: <span />, br: <br /> }} />
        </h2>
        <p className={styles["subtitle"]}>
          <Trans i18nKey="subtitle" components={{ br: <br /> }} />
        </p>
        <div className={styles["wrapper"]}>
          <div className={styles["office"]}>
            <p className={styles["office-title"]}>{t("office")}</p>
            <p className={styles["address"]}>
              Norway <br /> Oslo, Lilleakerveien 14 P.O Box 200 Lilleaker <br /> NO-0216
            </p>
            <img src={Map} alt={""} className={styles["map"]} />
          </div>
          <div className={styles["form"]}>
            <Input label={`${t("name")}*`} name={"name"} />
            <Input label={"Email*"} name={"email"} />
            <Input label={`${t("phone")}*`} name={"phone"} />

            <div className={styles["form-input"]}>
              <label htmlFor={"message"}>{t("message")}*</label>
              <textarea rows={7} id={"message"} />
            </div>
            <WideButton text={t("send_msg")} />
          </div>
        </div>
        <ScrollRestoration />
      </div>
    </I18nextProvider>
  );
};

export default Contacts;
