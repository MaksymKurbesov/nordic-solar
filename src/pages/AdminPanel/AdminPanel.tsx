import styles from "./AdminPanel.module.scss";
import { transactionService } from "@/main.tsx";
import { useEffect, useState } from "react";
import { parseTimestamp } from "@/utils/helpers/date.tsx";
import axios from "axios";
import { ITransaction } from "@/interfaces/IUser.ts";
import { BACKEND_URL } from "@/utils/const.tsx";

const AdminPanel = () => {
  const [transactions, setTransactions] = useState<ITransaction[] | null>(null);

  useEffect(() => {
    const unsubscribe = transactionService.getPendingTransactions((transactions) => {
      setTransactions(transactions);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const confirmTransaction = async (transaction: ITransaction) => {
    await axios.post(`${BACKEND_URL}/transaction/confirm-transaction`, transaction);
  };

  const cancelTransaction = async (transaction: ITransaction) => {
    await axios.post(`${BACKEND_URL}/transaction/decline-transaction`, transaction);
  };

  if (!transactions) return null;

  return (
    <div className={styles["admin-panel"]}>
      <h2>Adminka</h2>
      <ul>
        {transactions.map((transaction: ITransaction) => {
          return (
            <li key={transaction.id}>
              <div>
                <span>Никнейм</span>
                <span>{transaction.nickname}</span>
              </div>
              <div>
                <span>Сумма</span>
                <span>{transaction.amount ? transaction.amount : "Ошибка"}</span>
              </div>
              <div>
                <span>Тип</span>
                <span>{transaction.type}</span>
              </div>
              <div>
                <span>Исполнитель</span>
                <span>{transaction.executor}</span>
              </div>
              <div>
                <span>Статус</span>
                <span>{transaction.status}</span>
              </div>
              <div>
                <span>Дата</span>
                <span>{parseTimestamp(transaction.date)}</span>
              </div>
              <div className={styles["buttons"]}>
                <button onClick={() => cancelTransaction(transaction)}>Отмена</button>
                <button onClick={() => confirmTransaction(transaction)}>Подтвердить</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AdminPanel;
