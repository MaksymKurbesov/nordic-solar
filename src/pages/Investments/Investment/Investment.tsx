import styles from "./Investment.module.scss";
import WideButton from "@SharedUI/WideButton/WideButton";
import PlanVariants from "@SharedUI/PlanVariants/PlanVariants";
import ContactUs from "@SharedUI/ContactUs/ContactUs";
import { ScrollRestoration, useLocation, useNavigate } from "react-router-dom";
import { getInvestments } from "@/utils/INVESTMENTS";
import { I18nextProvider, useTranslation } from "react-i18next";

const getInvestmentShortName = (value: string) => {
  return value.split("-")[0];
};

const Investment = () => {
  const { t, i18n } = useTranslation("investments");
  const location = useLocation();
  const navigate = useNavigate();
  const investmentName = location.pathname.split("/")[2];
  const investment = getInvestments(t).find((product) => product.link === investmentName)!;
  const { title, subtitle, heroImage, mainText, subText } = investment;
  const shortInvestmentName = getInvestmentShortName(investmentName);

  return (
    <I18nextProvider i18n={i18n} defaultNS={"investments"}>
      <div className={`${styles["investment"]} container`}>
        <button onClick={() => navigate("/investments")} className={styles["back-button"]}>
          {t("back")}
        </button>
        <h2 className={"page-title"}>{title}</h2>
        <WideButton text={t("discuss")} />
        <p className={styles["subtitle"]}>{subtitle}</p>
        <img src={heroImage} alt={""} width={"100%"} className={styles["hero-image"]} />
        <div className={styles["text"]}>
          <p className={styles["individual-plans-text"]}>{mainText}</p>
          <div className={styles["individual-plans-text2"]}>{subText}</div>
        </div>
        <div className={styles["plans"]}>
          <h4>{t("variants")}</h4>
          <PlanVariants selectedPlan={shortInvestmentName} />
        </div>
        <ContactUs />
        <ScrollRestoration />
      </div>
    </I18nextProvider>
  );
};

export default Investment;
