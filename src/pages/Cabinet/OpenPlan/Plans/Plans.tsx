import styles from "./Plans.module.scss";
import PlanImage1 from "@assets/images/investments/individual.webp";
import PlanImage2 from "@assets/images/investments/mutual-fonds.webp";
import PlanImage3 from "@assets/images/investments/direct-investments.webp";
import PlanImage4 from "@assets/images/investments/corporative.webp";
import PlanImage5 from "@assets/images/investments/crowdfunding.webp";
import PlanImage6 from "@assets/images/investments/pension.webp";
import { useFormContext } from "react-hook-form";
import { NavLink } from 'react-router-dom';

export const PLANS = [
  {
    title: "Индивидуальные инвестиционные планы",
    image: PlanImage1,
    value: "individual",
    moreLink: "individual-investment-plans"
  },
  {
    title: "Взаимные фонды зеленой энергетики",
    image: PlanImage2,
    value: "mutual-fonds",
    moreLink: "mutual-fonds"
  },
  {
    title: "Программы коллективных инвестиций (Crowdfunding)",
    image: PlanImage5,
    value: "crowdfunding",
    moreLink: "crowdfunding-investment-programs"
  },
  {
    title: "Пенсионные инвестиционные планы",
    image: PlanImage6,
    value: "pension",
    moreLink: "pension-investment-plans"
  },
];

const Plans = () => {
  const { register, watch } = useFormContext();
  const selectedPlan = watch("plan");

  return (
    <div className={styles["plans-list-wrapper"]}>
      {/*<h2>Выберите тип плана</h2>*/}
      <ul className={styles["plans-list"]}>
        {PLANS.map((plan, index) => {
          return (
            <li
              key={index}
              className={`${selectedPlan === plan.value ? styles["active"] : ""}`}
            >
              <input
                value={plan.value}
                id={plan.value}
                type={"radio"}
                {...register("plan", {
                  required: "Выберите план",
                })}
              />
              <label htmlFor={plan.value} className={styles["plan-text"]}>
                <img src={plan.image} alt={""} />
                <p>{plan.title}</p>
                <NavLink target={"_blank"} to={`/investments/${plan.moreLink}`} className={styles['more-button']}>Подробнее</NavLink>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Plans;
