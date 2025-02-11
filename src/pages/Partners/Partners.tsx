import styles from "./Partners.module.scss";
import HeroImage from "@assets/images/partners-program.webp";
import { ScrollRestoration } from "react-router-dom";
import SuspenseImage from "@/utils/SuspenseImage.tsx";
import { I18nextProvider, Trans, useTranslation } from "react-i18next";

const Partners = () => {
  const { t, i18n } = useTranslation("partners");

  return (
    <I18nextProvider i18n={i18n} defaultNS={"partners"}>
      <div className={`${styles["partners"]} container`}>
        <h2 className={"page-title"}>{t("partner_program")}</h2>
        <p className={styles["subtitle"]}>
          <Trans i18nKey={"subtitle"} component={{ br: <br /> }} />
        </p>
        <SuspenseImage src={HeroImage} alt={""} width={"100%"} />
        <p className={styles["our-referral-text"]}>
          <Trans
            i18nKey={"our_referral"}
            components={{
              0: <span />,
              1: <span />,
              2: <span className={styles.green} />,
            }}
          />
        </p>
        <div className={styles["levels"]}>
          <h3>{t("levels")}</h3>
          <ul>
            <li className={"TON"}>
              <span>1 {t("level")}</span>
              <p>{t("level1_descr")}</p>
              <p>
                <span>8%</span> {t("reward")}
              </p>
            </li>
            <li className={"BTC"}>
              <span>2 {t("level")}</span>
              <p>{t("level2_descr")}</p>
              <p>
                <span>6%</span> {t("reward")}
              </p>
            </li>
            <li className={"USDT"}>
              <span>3 {t("level")}</span>
              <p>{t("level3_descr")}</p>
              <p>
                <span>4%</span> {t("reward")}
              </p>
            </li>
            <li className={"SOL"}>
              <span>4 {t("level")}</span>
              <p>{t("level4_descr")}</p>
              <p>
                <span>2%</span> {t("reward")}
              </p>
            </li>
          </ul>
        </div>
        <div className={styles["how-its-work"]}>
          <h3>{t("how_it_work")}</h3>
          <ul>
            <li>
              <span>1</span>
              <h4>{t("how1")}</h4>
              <p>{t("how1_descr")}</p>
            </li>
            <li>
              <span>2</span>
              <h4>{t("how2")}</h4>
              <p>{t("how2_descr")}</p>
            </li>
            <li>
              <span>3</span>
              <h4>{t("how3")}</h4>
              <p>{t("how3_descr")}</p>
            </li>
            <li>
              <span>4</span>
              <h4>{t("how4")}</h4>
              <p>{t("how4_descr")}</p>
            </li>
            <li>
              <span>5</span>
              <h4>{t("how5")}</h4>
              <p>{t("how5_descr")}</p>
            </li>
          </ul>
        </div>
        <p className={styles["footer-text"]}>
          <Trans i18nKey={"footer_text"} components={{ span: <span /> }} />
        </p>
        <ScrollRestoration />
      </div>
    </I18nextProvider>
  );
};

export default Partners;
