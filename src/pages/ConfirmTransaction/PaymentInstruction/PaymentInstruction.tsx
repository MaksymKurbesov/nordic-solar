import styles from "./PaymentInstruction.module.scss";
import { OUR_WALLETS } from "@/utils/OUR_WALLETS.tsx";
import CopyIcon from "@assets/icons/copy.svg?react";
import IconCircleCheckFilled from "@/assets/icons/circle-check.svg?react";
import { Dispatch, FC, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

interface IPaymentInstruction {
  wallet: string;
  transactionHash: string;
  setTransactionHash: Dispatch<SetStateAction<string>>;
  copyWalletHandler: () => void;
}

const PaymentInstruction: FC<IPaymentInstruction> = ({
  wallet,
  transactionHash,
  setTransactionHash,
  copyWalletHandler,
}) => {
  const { t } = useTranslation("confirmTransaction");

  return (
    <div className={styles["instruction"]}>
      <h2>{t("instruction_title")}</h2>
      <ul>
        <li className={styles["completed"]}>
          <p>1. {t("instruction1")}</p>
          <IconCircleCheckFilled width={17} />
        </li>
        <li className={styles["completed"]}>
          <p>2. {t("instruction2")}</p>
          <IconCircleCheckFilled width={17} />
        </li>
        <li>
          <p>3. {t("instruction3")}</p>
          <div className={styles["wallet-address-wrapper"]}>
            <p className={styles["wallet-address"]} onClick={copyWalletHandler}>
              <span>{OUR_WALLETS[wallet]}</span> <CopyIcon />
            </p>
            <p className={styles["title"]}>
              {t("wallet_address")} {wallet}
            </p>
          </div>
        </li>
        <li>
          <p>4. {t("instruction4")}</p>
          <input
            value={transactionHash}
            onChange={(e) => setTransactionHash(e.target.value)}
            placeholder={t("hash")}
          />
        </li>
      </ul>
    </div>
  );
};

export default PaymentInstruction;
