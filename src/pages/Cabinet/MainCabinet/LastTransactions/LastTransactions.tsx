import styles from "./LastTransactions.module.scss";
import Table from "@SharedUI/Table/Table.tsx";
import { TRANSACTION_COLUMNS } from "@/utils/const.tsx";

const LastTransactions = ({ transactions }) => {
  return (
    <div className={styles["last-transactions"]}>
      <h3>Последние транзакции</h3>
      {transactions.length === 0 ? "У вас нет транзакций" : <Table columns={TRANSACTION_COLUMNS} data={transactions} />}
    </div>
  );
};

export default LastTransactions;
