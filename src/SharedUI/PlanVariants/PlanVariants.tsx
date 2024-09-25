import styles from "./PlanVariants.module.scss";
import GeoIcon from "@assets/icons/geo.svg?react";
import MoneyIcon from "@assets/icons/money.svg?react";
import { useFormContext } from "react-hook-form";

const PLAN_VARIANTS = [
  {
    name: "Начальный",
    region: "Америка",
    accruals: "Ежедневно",
    inDay: 1.2,
    days: 15,
    minDeposit: 100,
    maxDeposit: 10000,
    value: "beginner",
  },
  {
    name: "Доступный",
    region: "Африка",
    accruals: "Ежедневно",
    inDay: 1.8,
    days: 25,
    minDeposit: 100,
    maxDeposit: 10000,
    value: "available",
  },
  {
    name: "Оптимальный",
    region: "Азия",
    accruals: "Ежедневно",
    inDay: 1.2,
    days: 15,
    minDeposit: 100,
    maxDeposit: 10000,
    value: "optimal",
  },
  {
    name: "Максимальный",
    region: "Европа",
    accruals: "Ежедневно",
    inDay: 1.2,
    days: 15,
    minDeposit: 100,
    maxDeposit: 10000,
    value: "maximum",
  },
];

const PlanVariants = ({ register, selectedVariant }) => {
  return (
    <ul className={styles["plans-list"]}>
      {PLAN_VARIANTS.map((plan) => {
        return (
          <li
            key={plan.name}
            className={`${selectedVariant === plan.value ? styles["active"] : ""}`}
          >
            {register && (
              <input
                value={plan.value}
                id={plan.value}
                type={"radio"}
                {...register("variant")}
              />
            )}
            <label htmlFor={plan.value}>
              <p className={styles["plan-name"]}>{plan.name}</p>
              <div className={styles["plan-row"]}>
                <div className={styles["region"]}>
                  <span>
                    <GeoIcon height={18} /> Регион
                  </span>
                  <p>{plan.region}</p>
                </div>
                <div className={styles["accruals"]}>
                  <span>
                    <MoneyIcon height={18} />
                    Начисления
                  </span>
                  <p>{plan.accruals}</p>
                </div>
              </div>
              <div className={styles["plan-row"]}>
                <div>
                  <span>В день</span>
                  <p>{plan.inDay}%</p>
                </div>
                <div>
                  <span>Дней</span>
                  <p>{plan.days}</p>
                </div>
                <div>
                  <span>Мин. депозит</span>
                  <p>${plan.minDeposit}</p>
                </div>
                <div>
                  <span>Макс. депозит</span>
                  <p>${plan.maxDeposit}</p>
                </div>
              </div>
            </label>
          </li>
        );
      })}
    </ul>
  );
};

export default PlanVariants;
