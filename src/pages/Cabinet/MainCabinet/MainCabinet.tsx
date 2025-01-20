import styles from "./MainCabinet.module.scss";
import Wallets from "@/pages/Cabinet/MainCabinet/Wallets/Wallets.tsx";
import Deposits from "@/pages/Cabinet/MainCabinet/Deposits/Deposits.tsx";
import NextAccrual from "@/pages/Cabinet/MainCabinet/NextAccrual/NextAccrual.tsx";
import LastTransactions from "@/pages/Cabinet/MainCabinet/LastTransactions/LastTransactions.tsx";
import { useUser } from "@/hooks/useUser.ts";
import { getActiveRestriction, sortByAvailable } from "@/utils/helpers.tsx";
import { ReactElement, useEffect, useState } from "react";
import WithdrawnLimit from "@/pages/Cabinet/MainCabinet/Restrictions/WithdrawnLimit.tsx";
import CheaterInReferral from "@/pages/Cabinet/MainCabinet/Restrictions/CheaterInReferral.tsx";
import FinancialGateway from "@/pages/Cabinet/MainCabinet/Restrictions/FinancialGateway.tsx";
import MultiAcc from "@/pages/Cabinet/MainCabinet/Restrictions/MultiAcc.tsx";
import MoneyLaundering from "@/pages/Cabinet/MainCabinet/Restrictions/MoneyLaundering.tsx";
import axios from "axios";
import { transformDeposit } from "@/utils/helpers/transformData.tsx";
import { useFirebaseUser } from "@/context/AuthContext.tsx";

const MainCabinet = () => {
  const { user } = useUser();
  const { user: firebaseUser } = useFirebaseUser();
  const { setDeposits } = useUser(firebaseUser?.displayName || "");

  const activeRestriction = getActiveRestriction(user?.restrictions);
  const [restrictionMessage, setRestrictionMessage] = useState<ReactElement | null>(null);

  useEffect(() => {
    if (!firebaseUser) return;

    const fetchDeposits = async () => {
      const deposits = await axios.post("http://localhost:3010/deposits/get-deposits", {
        nickname: firebaseUser.displayName,
      });

      console.log(deposits.data, "deposits.data");

      setDeposits(deposits.data.map(transformDeposit));
    };

    fetchDeposits();
  }, [firebaseUser]);

  useEffect(() => {
    switch (activeRestriction) {
      case "isWithdrawnLimit":
        setRestrictionMessage(<WithdrawnLimit />);
        return;
      case "isFinancialGateway":
        setRestrictionMessage(<FinancialGateway />);
        return;
      case "isReferralCheater":
        // setRestrictionMessage(<ReferralCheater />)
        return;
      case "isPrivateKeyInvalid":
        // setRestrictionMessage(<PrivateKeyInvalid />)
        return;
      case "isMultiAcc":
        setRestrictionMessage(<MultiAcc />);
        return;
      case "isCheaterInReferral":
        setRestrictionMessage(<CheaterInReferral />);
        return;
      case "isMoneyLaundering":
        setRestrictionMessage(<MoneyLaundering />);
        return;
    }
  }, [activeRestriction]);

  if (!user) return null;

  return (
    <div className={styles["main-cabinet"]}>
      {restrictionMessage}
      <Wallets wallets={sortByAvailable(user.wallets)} />
      <Deposits deposits={user.deposits} />
      <div className={styles["accrual-wrapper"]}>
        <NextAccrual deposits={user.deposits} />
        <LastTransactions transactions={user.transactions} />
      </div>
    </div>
  );
};

export default MainCabinet;
