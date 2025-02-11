import styles from "./TransactionForm.module.scss";
import Wallet from "@SharedUI/Wallet/Wallet.tsx";
import { WALLETS } from "@/utils/const.tsx";
import Input from "@SharedUI/Input/Input.tsx";
import { IWallets } from "@/interfaces/IWallets.ts";
import { FC } from "react";
import { UseFormRegister, UseFormTrigger } from "react-hook-form";
import { IWithdrawnFormData } from "@/pages/Cabinet/Withdrawn/Withdrawn.tsx";
import { IDepositFormData } from "@/pages/Cabinet/MakeDeposit/MakeDeposit.tsx";
import { useTranslation } from "react-i18next";

interface ITransactionForm {
  wallets: IWallets;
  selectedWallet: string;
  register: UseFormRegister<IWithdrawnFormData | IDepositFormData>;
  inputText: string;
  trigger?: UseFormTrigger<IWithdrawnFormData | IDepositFormData>;
}

const TransactionForm: FC<ITransactionForm> = ({ wallets, selectedWallet, register, inputText, trigger }) => {
  const { t } = useTranslation("openPlan");

  return (
    <div className={styles["transaction-form"]}>
      <h3 className={styles["step-title"]}>
        <span>1</span> {t("wallet_error")}
      </h3>
      <ul className={styles["wallets-list"]}>
        {Object.entries(wallets).map((wallet, index) => {
          return (
            <li key={index} className={`${selectedWallet === wallet[0] ? styles["active"] : ""}`}>
              <input value={wallet[0]} id={wallet[0]} type={"radio"} {...register("wallet")} />
              <label htmlFor={wallet[0]}>
                <Wallet wallet={WALLETS[wallet[0]]}>
                  <div className={styles["balance"]}>
                    <p>{t("balance")}</p>
                    <span>${wallet[1].available.toFixed(2)}</span>
                  </div>
                </Wallet>
              </label>
            </li>
          );
        })}
      </ul>
      <h3 className={styles["step-title"]}>
        <span>2</span> {inputText}
      </h3>
      <div className={styles["amount-input"]}>
        <Input register={register} name={"amount"} trigger={trigger} />
        <p className={styles["tax"]}>{t("commission")}: 0%</p>
      </div>
    </div>
  );
};

export default TransactionForm;
