import styles from "./Transactions.module.scss";
import Table from "@SharedUI/Table/Table.tsx";
import { getTransactionColumns } from "@/utils/const.tsx";
import { useUser } from "@/hooks/useUser.ts";
import { useTranslation } from "react-i18next";
import { collection, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore";
import { db } from "@/main.tsx";
import { ITransaction } from "@/interfaces/IUser";
import { transformTransaction } from "@/utils/helpers/transformData.tsx";
import { useState } from "react";

const Transactions = () => {
  const { t } = useTranslation("cabinet");
  const { user, dispatch } = useUser();
  const [visibleTransactions, setVisibleTransactions] = useState(10);

  const fetchMoreTransactions = async () => {
    if (!user) return;

    const nextQuery = query(
      collection(db, "transactions"),
      where("nickname", "==", user.nickname),
      orderBy("date", "desc"),
      startAfter(user.lastTransaction),
      limit(10),
    );

    const querySnapshot = await getDocs(nextQuery);
    const newTransactions = querySnapshot.docs.map((doc) => ({
      id: String(doc.id),
      ...doc.data(),
    })) as ITransaction[];

    const transformedTransactions = newTransactions.map((transaction) => {
      return transformTransaction(transaction, t);
    });

    dispatch({ type: "SET_TRANSACTIONS", payload: [...user.transactions, ...transformedTransactions] });
    dispatch({
      type: "SET_LAST_TRANSACTION",
      payload: querySnapshot.docs[querySnapshot.docs.length - 1] || null,
    });

    setVisibleTransactions((prev) => prev + 10);
  };

  if (!user || !user.transactions) return;

  return (
    <div className={styles["transactions"]}>
      <h3>{t("last_transactions")}</h3>
      <div className={styles["table-wrapper"]}>
        <Table columns={getTransactionColumns(t)} data={user.transactions?.slice(0, visibleTransactions)} />
      </div>

      {visibleTransactions < user.transactions.length && (
        <button
          onClick={() => setVisibleTransactions((prev) => prev + 10)}
          className={styles["load-more-button"]}
        >
          Смотреть еще 10
        </button>
      )}

      {user.transactions.length === visibleTransactions && (
        <button onClick={fetchMoreTransactions} className={styles["load-more-button"]}>
          Загрузить еще 10
        </button>
      )}
    </div>
  );
};

export default Transactions;
