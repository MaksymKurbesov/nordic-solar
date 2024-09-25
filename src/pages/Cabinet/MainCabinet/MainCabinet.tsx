import styles from "./MainCabinet.module.scss";
import Wallets from "@/pages/Cabinet/MainCabinet/Wallets/Wallets.tsx";
import Deposits from "@/pages/Cabinet/MainCabinet/Deposits/Deposits.tsx";
import NextAccrual from "@/pages/Cabinet/MainCabinet/NextAccrual/NextAccrual.tsx";
import LastTransactions from "@/pages/Cabinet/MainCabinet/LastTransactions/LastTransactions.tsx";
import { useUser } from "@/hooks/useUser.ts";
import { useEffect, useState } from "react";
import { depositService, transactionService } from "@/main.tsx";
import { transformTransaction } from "@/utils/helpers.ts";
import transaction from "@/services/Transaction.ts";

const MainCabinet = () => {
  const { user } = useUser();
  const [transactions, setTransactions] = useState(null);
  const [deposits, setDeposits] = useState([]);

  console.log(deposits, "deposits");

  useEffect(() => {
    if (!user) return;

    const unsubscribeDeposits = depositService.getAllDeposits(
      setDeposits,
      user.nickname,
    );

    const unsubscribe = transactionService.subscribeToLastTenTransactions(
      user?.nickname,
      (updatedTransactions) => {
        setTransactions(updatedTransactions.map(transformTransaction));
      },
    );

    return () => unsubscribe();
  }, [user]);

  if (!user || !transactions) return null;

  return (
    <div className={styles["main-cabinet"]}>
      <Wallets wallets={user.wallets} />
      <Deposits deposits={deposits} />
      <NextAccrual />
      <LastTransactions transactions={transactions.slice(0, 4)} />
    </div>
  );
};

export default MainCabinet;
