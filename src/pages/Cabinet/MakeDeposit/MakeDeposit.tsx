import styles from "./MakeDeposit.module.scss";
import { WALLETS } from "@/utils/const.tsx";
import Wallet from "@SharedUI/Wallet/Wallet.tsx";
import Input from "@SharedUI/Input/Input.tsx";
import WideButton from "@SharedUI/WideButton/WideButton.tsx";

const MakeDeposit = () => {
  return (
    <div className={styles["make-deposit"]}>
      <h3 className={styles["step-title"]}>
        <span>1</span> Выберите кошелек
      </h3>
      <ul className={styles["wallets-list"]}>
        {WALLETS.map((wallet, index) => (
          <li key={index}>
            <Wallet wallet={wallet}>
              <div className={styles["balance"]}>
                <p>Баланс</p>
                <span>$4 123.60</span>
              </div>
            </Wallet>
          </li>
        ))}
      </ul>
      <h3 className={styles["step-title"]}>
        <span>2</span> Введите сумму пополнения
      </h3>
      <div className={styles["amount-input"]}>
        <Input />
        <p className={styles["tax"]}>Комиссия: 0%</p>
      </div>
      <WideButton text={"Пополнить баланс"} />
    </div>
  );
};

export default MakeDeposit;
