import styles from "./LastTransactions.module.scss";
import { getTransactionColumns } from "@/utils/const.tsx";
import { useState } from "react";
import { ITransaction, ITransformedTransaction } from "@/interfaces/IUser.ts";
import { useTranslation } from "react-i18next";

const LastTransactions = ({ transactions }: { transactions: ITransaction[] | ITransformedTransaction[] }) => {
  const { t } = useTranslation("cabinet");
  const [collapsedTransactions, setCollapsedTransactions] = useState<number[]>([]);

  const toggleItem = (index: number): void => {
    setCollapsedTransactions((prev: number[]): number[] => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  if (!transactions) {
    return <div>{t("no_transactions")}</div>;
  }

  return (
    <div className={styles["last-transactions"]}>
      <h3>{t("last_transactions")}</h3>
      {transactions.length === 0 ? (
        t("no_transactions")
      ) : (
        <ul className={styles["last-transactions-list"]}>
          {transactions.slice(0, 4).map((transaction, index) => {
            return (
              <li
                key={index}
                className={`${transaction.color} ${collapsedTransactions.includes(index) ? styles["opened"] : ""}`}
                onClick={() => toggleItem(index)}
              >
                <div className={styles["transaction-wrapper"]}>
                  {getTransactionColumns(t).map((column, index) => {
                    const columnKey = column.key as keyof ITransaction;

                    return (
                      <p key={index} className={`${styles["cell"]} ${styles[column.key]}`}>
                        <span>{column.title}</span>
                        <span className={`${styles[transaction[columnKey]]}`}>
                          {`${columnKey === "type" || columnKey === "status" ? t(transaction[columnKey]) : transaction[columnKey]}`}
                        </span>
                      </p>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default LastTransactions;
