import { useForm } from "react-hook-form";
import { ScrollRestoration, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "@/hooks/useUser.ts";
import TransactionForm from "@SharedUI/TransactionForm/TransactionForm.tsx";
import styles from "./Withdrawn.module.scss";
import WideButton from "@SharedUI/WideButton/WideButton.tsx";

const Withdrawn = () => {
  const { user } = useUser();
  const form = useForm({
    defaultValues: {
      wallet: "",
      amount: 0,
    },
    mode: "onChange",
  });
  const { register, watch } = form;
  const selectedWallet = watch().wallet;
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const submitConfirm = () => {
    const wallet = watch().wallet;
    const amount = watch().amount;

    if (!wallet || !amount) return;

    navigate("/cabinet/make-deposit/confirm-transaction", {
      state: {
        wallet,
        amount,
        type: "withdrawn",
      },
    });
  };

  if (!user) return;

  return (
    <div className={styles["withdrawn"]}>
      <h2>Вывод средств</h2>
      <TransactionForm
        wallets={user.wallets}
        selectedWallet={selectedWallet}
        register={register}
        inputText={"Введите сумму вывода"}
      />
      <WideButton text={"Вывести средства"} onClickHandler={submitConfirm} />
      <ScrollRestoration />
    </div>
  );
};

export default Withdrawn;
