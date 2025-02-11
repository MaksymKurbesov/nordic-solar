import styles from "./Transactions.module.scss";
import Table from "@SharedUI/Table/Table.tsx";
import { getTransactionColumns } from "@/utils/const.tsx";
import { useUser } from "@/hooks/useUser.ts";
import { useTranslation } from "react-i18next";

const Transactions = () => {
  const { t } = useTranslation("cabinet");
  const { user } = useUser();

  if (!user) return;

  return (
    <div className={styles["transactions"]}>
      <h3>{t("last_transactions")}</h3>
      <div className={styles["table-wrapper"]}>
        <Table columns={getTransactionColumns(t)} data={user.transactions} />
      </div>

      <button className={styles["load-more-button"]}>Смотреть еще 10</button>
    </div>
  );
};

export default Transactions;
