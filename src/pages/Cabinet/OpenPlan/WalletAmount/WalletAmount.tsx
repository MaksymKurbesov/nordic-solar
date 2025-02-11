import styles from "./WalletAmount.module.scss";
import TransactionForm from "@SharedUI/TransactionForm/TransactionForm.tsx";
import { useFormContext } from "react-hook-form";
import { useUser } from "@/hooks/useUser.ts";
import { sortByAvailable } from "@/utils/helpers";
import { useTranslation } from "react-i18next";

const WalletAmount = () => {
  const { user } = useUser();
  const { watch, register, trigger } = useFormContext();
  const selectedWallet = watch("wallet");
  const { t } = useTranslation("openPlan");

  return (
    <div className={styles["wallet-amount"]}>
      <TransactionForm
        wallets={sortByAvailable(user?.wallets)}
        selectedWallet={selectedWallet}
        register={register}
        inputText={t("enter_amount")}
        trigger={trigger}
      />
    </div>
  );
};

export default WalletAmount;
