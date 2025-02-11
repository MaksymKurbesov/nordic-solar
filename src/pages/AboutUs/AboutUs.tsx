import styles from "./AboutUs.module.scss";
import WideButton from "@SharedUI/WideButton/WideButton.tsx";
import Team from "@/pages/AboutUs/Team/Team.tsx";
import { ScrollRestoration } from "react-router-dom";
import InDigits from "@/pages/AboutUs/InDigits/InDigits";
import Features from "@/SharedUI/Features/Features";
import Image1 from "@assets/images/about-us-image1.webp";
import Image2 from "@assets/images/about-us-image2.webp";
import Image3 from "@assets/images/about-us-image3.webp";
import Image4 from "@assets/images/about-us-image4.webp";
import useWindowSize from "@/hooks/useWindowSize";
import MobileFeatures from "@SharedUI/Features/MobileFeatures";
import { I18nextProvider, Trans, useTranslation } from "react-i18next";

const getGoals = (t) => {
  return [
    {
      title: t("goal1"),
      description: t("goal1_descr"),
    },
    {
      title: t("goal2"),
      description: t("goal2_descr"),
    },
    {
      title: t("goal3"),
      description: t("goal3_descr"),
    },
    {
      title: t("goal4"),
      description: t("goal4_descr"),
    },
  ];
};

const getFeatures = (t) => {
  return [
    {
      title: t("feature1_title"),
      description: [t("feature1_descr")],
      image: Image1,
    },
    {
      title: t("feature2_title"),
      description: [t("feature2_descr")],
      image: Image2,
    },
    {
      title: t("feature3_title"),
      description: [t("feature3_descr")],
      image: Image3,
    },
    {
      title: t("feature4_title"),
      description: [t("feature4_descr")],
      image: Image4,
    },
  ];
};

const IMAGES = [Image1, Image2, Image3, Image4];

const AboutUs = () => {
  const windowSize = useWindowSize();
  const isMobile = windowSize.width < 900;
  const { t, i18n } = useTranslation("aboutUs");

  return (
    <I18nextProvider i18n={i18n} defaultNS={"aboutUs"}>
      <div className={`${styles["about-us"]} container`}>
        <h2 className={"page-title"}>{t("about")}</h2>
        <WideButton text={t("discuss")} />
        <p className={styles["expert-text"]}>{t("")}</p>
        <div className={styles["tabs"]}>
          {isMobile ? (
            <MobileFeatures features={getFeatures(t)} />
          ) : (
            <Features features={getFeatures(t)} images={IMAGES} />
          )}
        </div>
        <h3 className={styles["text-after-tabs"]}>
          <Trans i18nKey={"text_after_tabs"} components={{ span: <span /> }} />
        </h3>
        <div className={styles["goals"]}>
          <h4>{t("our_goals")}</h4>
          <ul>
            {getGoals(t).map((goal, index) => {
              return (
                <li key={goal.title} className={styles["goal"]}>
                  <span className={styles["goal-number"]}>{index + 1}</span>
                  <h5>{goal.title}</h5>
                  <p>{goal.description}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles["slider"]}>
          <InDigits />
        </div>
        <Team />
        <p className={styles["text-after-team"]}>
          <Trans
            i18nKey={"text_after_team"}
            components={{
              0: <span />,
              1: <span className={styles["green"]} />,
              2: <br />,
            }}
          />
        </p>
        <div className={styles["text-after-team2"]}>
          <p>{t("text_after_team2")}</p>
        </div>
      </div>
      <ScrollRestoration />
    </I18nextProvider>
  );
};

export default AboutUs;
