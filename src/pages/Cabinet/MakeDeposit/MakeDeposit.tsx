import { useForm } from "react-hook-form";
import { ScrollRestoration, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "@/hooks/useUser.ts";
import TransactionForm from "@SharedUI/TransactionForm/TransactionForm.tsx";
import styles from "./MakeDeposit.module.scss";
import WideButton from "@SharedUI/WideButton/WideButton.tsx";
import { sortByAvailable } from "@/utils/helpers";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export interface IDepositFormData {
  wallet: string;
  amount: number;
}

const MakeDeposit = () => {
  const { t } = useTranslation("topup");
  const { user } = useUser();
  const form = useForm<IDepositFormData>({
    defaultValues: {
      wallet: "",
      amount: 0,
    },
    mode: "onChange",
  });

  const { watch, register } = form;
  const selectedWallet = watch().wallet;
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const submitConfirm = () => {
    const wallet = watch().wallet;
    const amount = watch().amount;
    const isNumeric = !isNaN(amount);

    if (!wallet) {
      toast.error(t("choose_wallet"));
      return;
    }

    if (!isNumeric || amount < 1) {
      toast.error(t("incorrect_amount"));
      return;
    }

    navigate("/cabinet/make-deposit/confirm-transaction", {
      state: {
        wallet,
        amount,
        type: "deposit",
      },
    });
  };

  if (!user) return;

  return (
    <div className={styles["make-deposit"]}>
      <h2>{t("topup")}</h2>
      <TransactionForm
        wallets={sortByAvailable(user.wallets)}
        selectedWallet={selectedWallet}
        register={register}
        inputText={t("enter_topup_amount")}
      />
      <WideButton text={t("topup")} onClickHandler={submitConfirm} />
      <ScrollRestoration />
    </div>
  );
};

export default MakeDeposit;
