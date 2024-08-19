import styles from "./MainCabinet.module.scss";
import Wallets from "@/pages/Cabinet/MainCabinet/Wallets/Wallets.tsx";
import Deposits from "@/pages/Cabinet/MainCabinet/Deposits/Deposits.tsx";
import NextAccrual from "@/pages/Cabinet/MainCabinet/NextAccrual/NextAccrual.tsx";
import LastTransactions from "@/pages/Cabinet/MainCabinet/LastTransactions/LastTransactions.tsx";

const MainCabinet = () => {
  return (
    <div className={styles["main-cabinet"]}>
      <Wallets />
      <Deposits />
      <NextAccrual />
      <LastTransactions />
    </div>
  );
};

export default MainCabinet;
