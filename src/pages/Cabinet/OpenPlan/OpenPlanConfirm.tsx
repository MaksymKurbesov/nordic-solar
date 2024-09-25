import styles from "./OpenPlan.module.scss";
import ConfirmTransaction from "@/pages/ConfirmTransaction/ConfirmTransaction.tsx";
import { useFormContext } from "react-hook-form";

const OpenPlanConfirm = () => {
  const { watch } = useFormContext();

  const selectedPlan = watch("plan");
  const selectedVariant = watch("variant");
  const selectedWallet = watch("wallet");
  const amount = watch("amount");

  return (
    <div className={styles["open-plan-confirm"]}>
      <p>Plan: {selectedPlan}</p>
      <p>Variant: {selectedVariant}</p>
      <p>Wallet: {selectedWallet}</p>
      <p>amount: {amount}</p>
      <p>Доход в день: {amount}</p>
      <p>Общий доход: {amount}</p>
      <p>Дата: 24/09/2024</p>
      {/*<ConfirmTransaction />*/}
    </div>
  );
};

export default OpenPlanConfirm;
