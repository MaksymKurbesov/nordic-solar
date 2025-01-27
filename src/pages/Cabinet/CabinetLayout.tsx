import styles from "./CabinetLayout.module.scss";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "@SharedUI/Footer/Footer.tsx";
import CabinetMenu from "@SharedUI/CabinetMenu/CabinetMenu.tsx";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useFirebaseUser } from "@/context/AuthContext.tsx";
import { BACKEND_URL } from "@/utils/const.tsx";
import { collection, doc, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "@/main.tsx";
import { ITransaction, IUser } from "@/interfaces/IUser.ts";
import { UserContext } from "@/UserContext.tsx";
import { transformDeposit, transformTransaction } from "@/utils/helpers/transformData.tsx";
import SuspenseLoading from "@SharedUI/SuspenseLoading/SuspenseLoading.tsx";

const CabinetLayout = () => {
  const { state, dispatch } = useContext(UserContext);
  const { user: firebaseUser, isLoading } = useFirebaseUser();
  const [userIsFetched, setUserIsFetched] = useState(false);
  const navigate = useNavigate();
  const [isDepositsLoading, setIsDepositsLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !firebaseUser) {
      navigate("/");
    }
  }, [isLoading, firebaseUser]);

  useEffect(() => {
    if (!firebaseUser) return;

    const userQuery = doc(db, "users", firebaseUser.displayName);

    const unsubscribeUser = onSnapshot(userQuery, async (doc) => {
      if (doc.exists()) {
        const userData = doc.data() as IUser;

        dispatch({ type: "SET_USER", payload: userData });

        setUserIsFetched(true);

        if (userIsFetched) return;

        const transactionQuery = query(
          collection(db, "transactions"),
          where("nickname", "==", firebaseUser.displayName),
          orderBy("date", "desc"),
          limit(10),
        );

        onSnapshot(transactionQuery, (querySnapshot) => {
          const transactions = querySnapshot.docs.map((doc) => ({
            id: String(doc.id),
            ...doc.data(),
          })) as ITransaction[];

          const transformedTransactions = transactions.map((transaction) => {
            return transformTransaction(transaction);
          });

          dispatch({ type: "SET_TRANSACTIONS", payload: transformedTransactions });
        });

        setIsDepositsLoading(true);
        const depositsResponse = await axios.post(`${BACKEND_URL}/deposits/get-deposits`, {
          nickname: userData.nickname,
        });
        setIsDepositsLoading(false);

        const deposits = depositsResponse.data.map(transformDeposit);

        dispatch({ type: "SET_DEPOSITS", payload: deposits });
      }
    });

    axios.post(`${BACKEND_URL}/user/ip`, {
      username: firebaseUser.displayName,
    });

    return () => {
      unsubscribeUser();
    };
  }, [firebaseUser]);

  if (!state.user && isLoading) {
    return <SuspenseLoading />;
  }

  return (
    <div className={styles["cabinet"]}>
      <CabinetMenu />
      <div className="container">
        <Outlet context={[isDepositsLoading]} />
      </div>
      <Footer />
      <Toaster />
    </div>
  );
};

export default CabinetLayout;
