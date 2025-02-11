import styles from "./OpenPlanConfirm.module.scss";
import { useFormContext } from "react-hook-form";
import { calculateDailyIncome, calculateTotalIncome } from "@/utils/helpers";
import { PLAN_VARIANT } from "@/utils/const.tsx";
import IconCircleCheckFilled from "@/assets/icons/circle-check.svg?react";
import QuestionIcon from "@/assets/icons/help-octagon.svg?react";
import IconChevronRight from "@/assets/icons/chevron-right.svg?react";
import { Link } from "react-router-dom";
import { addDaysToTimestamp, parseTimestamp } from "@/utils/helpers/date.tsx";
import { Timestamp } from "firebase/firestore";
import { I18nextProvider, Trans, useTranslation } from "react-i18next";

const PLAN_MAP = {
  solar: "Solar Future",
  wind: "Wind Prosperity",
  hydro: "Hydro PowerEdge",
  hydrogen: "Hydrogen Horizons",
  mining: "Mining Farms",
};

const OpenPlanConfirm = () => {
  const { t, i18n } = useTranslation("openPlan");
  const { watch } = useFormContext();
  const selectedPlan = watch("plan");

  const selectedVariant = watch("variant");
  const variant = PLAN_VARIANT[selectedPlan][selectedVariant];
  const selectedWallet = watch("wallet");
  const amount = watch("amount");

  return (
    <I18nextProvider i18n={i18n} defaultNS={"openPlan"}>
      <div className={styles["open-plan-confirm"]}>
        <div className={styles["row"]}>
          <span className={styles["icon"]}>
            <IconCircleCheckFilled width={35} height={35} color={"#14CC74"} />
          </span>
          <p className={styles["success-transaction"]}>{t("success_transaction")}</p>
          <p className={styles["amount"]}>USD {Number(amount).toFixed(2)}</p>
        </div>
        <div className={`${styles["row"]} ${styles["receipt"]}`}>
          <p>
            <span>{t("plan")}:</span>
            <span> {PLAN_MAP[selectedPlan]}</span>
          </p>
          <p>
            <span>{t("type_plan")}:</span> <span>{variant.type}</span>
          </p>
          <p className={styles["wallet"]}>
            <span>{t("wallet")}:</span> <span>{selectedWallet}</span>
          </p>
          <p className={styles["amount-receipt"]}>
            <span>{t("amount")}:</span> <span>${amount}</span>
          </p>
          <p>
            <span>{t("income_day")}:</span>
            <span>${calculateDailyIncome(amount, variant.inDay)}</span>
          </p>
          <p className={styles["total-income"]}>
            <span>{t("income_total")}:</span>
            <span>${calculateTotalIncome(amount, variant.inDay, variant.days)}</span>
          </p>
          <p>
            <span>{t("open_date")}:</span> <span>{parseTimestamp(Timestamp.now())}</span>
          </p>
          <p>
            <span>{t("close_date")}:</span> <span>{parseTimestamp(addDaysToTimestamp(variant.days))}</span>
          </p>
        </div>
        <Link to={"https://t.me/nordic_solar"} target={"_blank"}>
          <div className={`${styles["row"]} ${styles["trouble"]}`}>
            <QuestionIcon width={30} height={30} />
            <p>
              <Trans i18nKey={"troubles"} components={{ span: <span /> }} />
            </p>
            <span className={styles["chevron"]}>
              <IconChevronRight />
            </span>
          </div>
        </Link>
      </div>
    </I18nextProvider>
  );
};

export default OpenPlanConfirm;
