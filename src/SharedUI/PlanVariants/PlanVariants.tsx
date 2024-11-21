import styles from "./PlanVariants.module.scss";
import GeoIcon from "@assets/icons/geo.svg?react";
import MoneyIcon from "@assets/icons/money.svg?react";
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from 'react';

export const PLAN_VARIANT = {
  "individual": {
    "beginner": {
      type:"Начинающий",
      days: 45,
      minDeposit: 50,
      maxDeposit: 2500,
      inDay: 1.1,
      region: "Европа",
      accruals: "Ежедневно"
    },
    "available": {
      type:"Доступный",
      days: 30,
      minDeposit: 2500,
      maxDeposit: 10000,
      inDay: 2,
      region: "Северная Америка",
      accruals: "Ежедневно"
    },
    "optimal": {
      type:"Оптимальный",
      days: 15,
      minDeposit: 10000,
      maxDeposit: -1,
      inDay: 3,
      region: "Азия",
      accruals: "В конце срока"
    },
  },
  "mutual-fonds": {
    "beginner": {
      type:"Начинающий",
      days: 45,
      minDeposit: 50,
      maxDeposit: 2500,
      inDay: 1.1,
      region: "Европа",
      accruals: "Ежедневно"
    },
    "available": {
      type:"Доступный",
      days: 30,
      minDeposit: 2500,
      maxDeposit: 10000,
      inDay: 2,
      region: "Южная Америка",
      accruals: "Ежедневно"
    },
    "optimal": {
      type:"Оптимальный",
      days: 15,
      minDeposit: 10000,
      maxDeposit: 40000,
      inDay: 3,
      region: "Ближний Восток",
      accruals: "В конце срока"
    },
    "maximum": {
      type:"Максимальный",
      days: 7,
      minDeposit: 40000,
      maxDeposit: -1,
      inDay: 55,
      region: "Африка",
      accruals: "В конце срока"
    }
  },
  "direct": {
    "beginner": {
      type:"Начинающий",
      days: 45,
      minDeposit: 200,
      maxDeposit: 5000,
      inDay: 1.8,
      region: "Австралия",
      accruals: "Ежедневно"
    },
    "available": {
      type:"Доступный",
      days: 30,
      minDeposit: 5000,
      maxDeposit: 25000,
      inDay: 2.8,
      region: "Европа",
      accruals: "Ежедневно"
    },
    "optimal": {
      type:"Оптимальный",
      days: 15,
      minDeposit: 25000,
      maxDeposit: 50000,
      inDay: 3.5,
      region: "Азия",
      accruals: "В конце срока"
    },
    "maximum": {
      type:"Максимальный",
      days: 7,
      minDeposit: 50000,
      maxDeposit: -1,
      inDay: -1,
      region: "Северная Америка",
      accruals: "В конце срока"
    }
  },
  "corporative": {
    "beginner": {
      type:"Начинающий",
      days: 45,
      minDeposit: 50,
      maxDeposit: 5000,
      inDay: 1.1,
      region: "Африка",
      accruals: "Ежедневно"
    },
    "available": {
      type:"Доступный",
      days: 30,
      minDeposit: 2500,
      maxDeposit: 10000,
      inDay: 2,
      region: "Ближний Восток",
      accruals: "Ежедневно"
    },
    "optimal": {
      type:"Оптимальный",
      days: 15,
      minDeposit: 10000,
      maxDeposit: -1,
      inDay: 3,
      region: "Южная Америка",
      accruals: "В конце срока"
    },
  },
}

export const PLAN_VARIANTS = [
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

const PlanVariants = ({ register, selectedPlan, selectedVariant }) => {
  const [variants, setVariants] = useState(null);

  useEffect(() => {
    setVariants(PLAN_VARIANT[selectedPlan])
  }, [])


  if (!variants) return;


  return (
    <ul className={styles["plans-list"]}>
      {Object.entries(variants).map((plan) => {
        const variantName = plan[0];
        const variant = plan[1];

        return (
          <li
            key={variantName}
            className={`${selectedVariant === variantName ? styles["active"] : ""}`}
          >
            {register && (
              <input
                value={variantName}
                id={variantName}
                type={"radio"}
                {...register("variant")}
              />
            )}
            <label htmlFor={variantName}>
              <p className={styles["plan-name"]}>{variant.type}</p>
              <div className={styles["plan-row"]}>
                <div className={styles["region"]}>
                  <span>
                    <GeoIcon height={18} /> Регион
                  </span>
                  <p>{variant.region}</p>
                </div>
                <div className={styles["accruals"]}>
                  <span>
                    <MoneyIcon height={18} />
                    Начисления
                  </span>
                  <p>{variant.accruals}</p>
                </div>
              </div>
              <div className={styles["plan-row"]}>
                <div>
                  <span>В день</span>
                  <p>{variant.inDay}%</p>
                </div>
                <div>
                  <span>Дней</span>
                  <p>{variant.days}</p>
                </div>
                <div>
                  <span>Мин. депозит</span>
                  <p>${variant.minDeposit}</p>
                </div>
                <div>
                  <span>Макс. депозит</span>
                  <p>${variant.maxDeposit === -1 ? "∞" : variant.maxDeposit}</p>
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
