import styles from "./Instruction.module.scss";
import { useTranslation } from "react-i18next";

const getInstruction = (t) => {
  return [
    {
      title: t("step_title1"),
      steps: [t("step1_1"), t("step1_2"), t("step1_3")],
    },
    {
      title: t("step_title2"),
      steps: [t("step2_1"), t("step2_2")],
    },
    {
      title: t("step_title3"),
      steps: [t("step3_1"), t("step3_2"), t("step3_3")],
    },
    {
      title: t("step_title4"),
      steps: [t("step4_1"), t("step4_2"), t("step4_3")],
    },
    {
      title: t("step_title5"),
      steps: [t("step5_1"), t("step5_2"), t("step5_3")],
    },
    {
      title: t("step_title6"),
      steps: [t("step6_1"), t("step6_2")],
    },
  ];
};

const Instruction = () => {
  const { t } = useTranslation("instruction");

  return (
    <div className={styles["instruction"]}>
      <h3>{t("instruction")}</h3>
      <ul className={styles["step-list"]}>
        {getInstruction(t).map((item, index) => {
          return (
            <li key={item.title} className={styles["step"]}>
              <span>
                {t("step")} {index + 1}
              </span>
              <div className={styles["step-info"]}>
                <h4>{item.title}</h4>
                <ul>
                  {item.steps.map((step, index) => {
                    return (
                      <li key={index}>
                        <p>
                          {index + 1}. {step}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Instruction;
