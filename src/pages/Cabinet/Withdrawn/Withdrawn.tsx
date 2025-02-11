import { ScrollRestoration, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "@/hooks/useUser.ts";
import TransactionForm from "@SharedUI/TransactionForm/TransactionForm.tsx";
import styles from "./Withdrawn.module.scss";
import WideButton from "@SharedUI/WideButton/WideButton.tsx";
import { useForm } from "react-hook-form";
import { hasActiveRestrictions, sortByAvailable } from "@/utils/helpers.tsx";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export interface IWithdrawnFormData {
  wallet: string;
  amount: number;
}

const Withdrawn = () => {
  const { t, i18n } = useTranslation("withdrawn");
  const { user } = useUser();
  const form = useForm<IWithdrawnFormData>({
    defaultValues: {
      wallet: "",
      amount: 0,
    },
    mode: "onChange",
  });

  const { watch, register } = form;
  const navigate = useNavigate();
  const userHasRestriction = hasActiveRestrictions(user?.restrictions);
  const selectedWallet = watch().wallet;

  const submitConfirm = () => {
    const wallet = watch().wallet;
    const amount = watch().amount;

    if (userHasRestriction) return;

    if (!wallet) {
      toast.error("Выберите кошелёк");
      return;
    }

    if (user && user.wallets[wallet].available < amount) {
      toast.error("Недостаточно средств на кошельке");
      return;
    }

    if (isNaN(amount)) {
      toast.error("Некорректная сумма");
      return;
    }

    if (amount < 10) {
      toast.error("Минимальная сумма вывода 10$");
      return;
    }

    navigate("/cabinet/withdrawn/confirm-transaction", {
      state: {
        wallet,
        amount,
        type: "withdrawn",
      },
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!user) return null;

  return (
    <div className={styles["withdrawn"]}>
      <h2>{t("withdrawn")}</h2>
      <TransactionForm
        wallets={sortByAvailable(user.wallets)}
        selectedWallet={selectedWallet}
        register={register}
        inputText={t("enter_amount")}
      />
      <WideButton isDisabled={userHasRestriction} text={t("withdraw")} onClickHandler={submitConfirm} />
      <ScrollRestoration />
    </div>
  );
};

export default Withdrawn;
