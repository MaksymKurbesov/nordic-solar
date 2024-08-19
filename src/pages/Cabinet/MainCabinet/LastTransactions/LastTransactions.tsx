import styles from "./LastTransactions.module.scss";
import Table from "@SharedUI/Table/Table.tsx";
import { TRANSACTION_COLUMNS } from "@/utils/const.tsx";

const TRANSACTIONS = [
  {
    id: "63871863",
    amount: "$1 219",
    paymentSystem: "TRC20 Tether",
    date: "23 июля, 2024, 10:11",
    status: "Успешно",
  },
  {
    id: "14623863",
    amount: "$2 219",
    paymentSystem: "Bitcoin",
    date: "21 мая, 2024, 12:26",
    status: "В ожидание",
  },
  {
    id: "27765432",
    amount: "$5 119",
    paymentSystem: "TRC20 Tether",
    date: "22 июля, 2024, 23:01",
    status: "Отменено",
  },
  {
    id: "63871863",
    amount: "$1 219",
    paymentSystem: "TRC20 Tether",
    date: "23 июля, 2024, 10:11",
    status: "Успешно",
  },
];

const LastTransactions = () => {
  return (
    <div className={styles["last-transactions"]}>
      <h3>Последние транзакции</h3>
      <Table columns={TRANSACTION_COLUMNS} data={TRANSACTIONS} />
    </div>
  );
};

export default LastTransactions;
