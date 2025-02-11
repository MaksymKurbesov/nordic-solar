import styles from "./Plans.module.scss";
import { useFormContext } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { getInvestments } from "@/utils/INVESTMENTS.tsx";
import SuspenseImage from "@/utils/SuspenseImage.tsx";
import { useTranslation } from "react-i18next";

const Plans = () => {
  const { register, watch } = useFormContext();
  const selectedPlan = watch("plan");
  const { t } = useTranslation("investments");

  return (
    <div className={styles["plans-list-wrapper"]}>
      <ul className={styles["plans-list"]}>
        {getInvestments(t).map((plan, index) => {
          return (
            <li key={index} className={`${selectedPlan === plan.value ? styles["active"] : ""}`}>
              <input
                value={plan.value}
                id={plan.value}
                type={"radio"}
                {...register("plan", {
                  required: t("plan_error_message"),
                })}
              />
              <label htmlFor={plan.value} className={styles["plan-text"]}>
                <SuspenseImage src={plan.thumbImage} alt={""} />
                <p>{plan.title}</p>
                <NavLink target={"_blank"} to={`/investments/${plan.link}`} className={styles["more-button"]}>
                  {t("more")}
                </NavLink>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Plans;
