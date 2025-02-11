import styles from "./PlanVariants.module.scss";
import GeoIcon from "@assets/icons/geo.svg?react";
import MoneyIcon from "@assets/icons/money.svg?react";
import { FC, useEffect, useState } from "react";
import { PLAN_VARIANT } from "@/utils/const.tsx";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { IPlanGroup, PlanType, PlanVariant } from "@/interfaces/IPlanVariant.ts";
import { useTranslation } from "react-i18next";

interface IPlanVariants {
  register: UseFormRegister<FieldValues>;
  selectedPlan: PlanType;
  selectedVariant: PlanVariant;
}

const PlanVariants: FC<IPlanVariants> = ({ register, selectedPlan, selectedVariant }) => {
  const { t } = useTranslation("variants");
  const [variants, setVariants] = useState<IPlanGroup | null>(null);

  useEffect(() => {
    setVariants(PLAN_VARIANT[selectedPlan]);
  }, []);

  if (!variants) return;

  return (
    <ul className={styles["plans-list"]}>
      {Object.entries(variants).map((plan) => {
        const variantName = plan[0];
        const variant = plan[1];

        return (
          <li key={variantName} className={`${selectedVariant === variantName ? styles["active"] : ""}`}>
            {register && (
              <input value={variantName} id={variantName} type={"radio"} {...register("variant")} />
            )}
            <label htmlFor={variantName}>
              <p className={styles["plan-name"]}>{variant.type}</p>
              <div className={styles["plan-row"]}>
                <div className={styles["region"]}>
                  <span>
                    <GeoIcon height={18} /> {t("region")}
                  </span>
                  <p>{t(`${variant.region}`)}</p>
                </div>
                <div className={styles["accruals"]}>
                  <span>
                    <MoneyIcon height={18} />
                    {t("accruals")}
                  </span>
                  <p>{t(`${variant.accruals}`)}</p>
                </div>
              </div>
              <div className={styles["plan-row"]}>
                <div>
                  <span>{t("in_day")}</span>
                  <p>{variant.inDay ? `${variant.inDay}%` : t("individual")}</p>
                </div>
                <div>
                  <span>{t("days")}</span>
                  <p>{variant.days}</p>
                </div>
                <div>
                  <span>{t("min_deposit")}</span>
                  <p>${variant.minDeposit}</p>
                </div>
                <div>
                  <span>{t("max_deposit")}</span>
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
