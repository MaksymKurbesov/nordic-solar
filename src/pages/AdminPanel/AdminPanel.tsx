import styles from "./AdminPanel.module.scss";
import { transactionService } from "@/main.tsx";
import { useEffect, useState } from "react";
import { parseTimestamp } from "@/utils/helpers.ts";

const AdminPanel = () => {
  const [transactions, setTransactions] = useState(null);

  const fetchTransactions = async () => {
    const data = await transactionService.getPendingTransactions();
    setTransactions(data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (!transactions) return null;

  return (
    <div className={styles["admin-panel"]}>
      <h2>АДМИН ПАНЕЛЬ</h2>
      <ul>
        {transactions.map((transaction) => {
          console.log(transaction.id, "transaction.id");

          return (
            <li key={transaction.id}>
              <div>
                <span>Никнейм</span>
                <span>{transaction.nickname}</span>
              </div>
              <div>
                <span>Сумма</span>
                <span>{transaction.amount}</span>
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
                <button>Отмена</button>
                <button
                  onClick={() => {
                    transactionService.confirmTransaction(transaction);
                  }}
                >
                  Подтвердить
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AdminPanel;
