import styles from "./Transactions.module.scss";
import Table from "@SharedUI/Table/Table.tsx";
import { TRANSACTION_COLUMNS } from "@/utils/const.tsx";
import { useUser } from "@/hooks/useUser.ts";
import { useEffect, useState } from "react";
import { transactionService } from "@/main.tsx";
import { transformTransaction } from "@/utils/helpers.tsx";

const Transactions = () => {
  const { user } = useUser();

  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = transactionService.subscribeToLastTenTransactions(
      user?.nickname,
      (updatedTransactions) => {
        setTransactions(updatedTransactions.map(transformTransaction));
      },
    );

    return () => unsubscribe();
  }, [user]);

  if (!transactions) {
    return null;
  }

  return (
    <div className={styles["transactions"]}>
      <h3>Последние транзакции</h3>
      <div className={styles["table-wrapper"]}>
        <Table columns={TRANSACTION_COLUMNS} data={transactions} />
      </div>

      <button className={styles["load-more-button"]}>Смотреть еще 10</button>
    </div>
  );
};

export default Transactions;
