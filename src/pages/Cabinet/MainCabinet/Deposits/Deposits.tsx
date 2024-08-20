import styles from "./Deposits.module.scss";
import Table from "@SharedUI/Table/Table.tsx";

const DEPOSITS = [
  {
    region: "Limassol",
    progress: "2/12",
    nextAccrual: "23:55:00",
    paymentSystem: "TRC20 Tether",
    amount: "$432.00",
    received: "$12.24",
    willReceived: "$42.24",
    openDate: "11 июля",
    closeDate: "13 августа",
  },
  {
    region: "Limassol",
    progress: "2/12",
    nextAccrual: "23:55:00",
    paymentSystem: "TRC20 Tether",
    amount: "$432.00",
    received: "$12.24",
    willReceived: "$42.24",
    openDate: "11 июля",
    closeDate: "13 августа",
  },
  {
    region: "Limassol",
    progress: "2/12",
    nextAccrual: "23:55:00",
    paymentSystem: "TRC20 Tether",
    amount: "$432.00",
    received: "$12.24",
    willReceived: "$42.24",
    openDate: "11 июля",
    closeDate: "13 августа",
  },
  {
    region: "Limassol",
    progress: "2/12",
    nextAccrual: "23:55:00",
    paymentSystem: "TRC20 Tether",
    amount: "$432.00",
    received: "$12.24",
    willReceived: "$42.24",
    openDate: "11 июля",
    closeDate: "13 августа",
  },
];

const DEPOSIT_COLUMNS = [
  {
    title: "Регион",
    key: "region",
  },
  {
    title: "Прогресс",
    key: "progress",
  },
  {
    title: "Начисление",
    key: "nextAccrual",
  },
  {
    title: "Способ оплаты",
    key: "paymentSystem",
  },
  {
    title: "Сумма",
    key: "amount",
  },
  {
    title: "Получено",
    key: "received",
  },
  {
    title: "Будет получено",
    key: "willReceived",
  },
  {
    title: "Дата открытия",
    key: "openDate",
  },
  {
    title: "Дата закрытия",
    key: "closeDate",
  },
];

const Deposits = () => {
  return (
    <div className={styles["deposits"]}>
      <div className={styles["deposits-buttons"]}>
        <button>Активные депозиты</button>
        <button>Завершенные депозиты</button>
      </div>
      <Table columns={DEPOSIT_COLUMNS} data={DEPOSITS} isDeposit />
    </div>
  );
};

export default Deposits;
