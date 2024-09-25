import styles from "./WalletAmount.module.scss";
import TransactionForm from "@SharedUI/TransactionForm/TransactionForm.tsx";
import { useFormContext } from "react-hook-form";
import { useUser } from "@/hooks/useUser.ts";

const WalletAmount = () => {
  const { user } = useUser();
  const { watch, register } = useFormContext();
  const selectedWallet = watch("wallet");

  return (
    <div className={styles["wallet-amount"]}>
      <TransactionForm
        wallets={user.wallets}
        selectedWallet={selectedWallet}
        register={register}
        inputText={"Введите сумму"}
      />
      {/*wallets, selectedWallet, register, inputText*/}
    </div>
  );
};

export default WalletAmount;
