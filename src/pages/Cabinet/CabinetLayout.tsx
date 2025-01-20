import styles from "./CabinetLayout.module.scss";
import { Outlet } from "react-router-dom";
import Footer from "@SharedUI/Footer/Footer.tsx";
import CabinetMenu from "@SharedUI/CabinetMenu/CabinetMenu.tsx";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import axios from "axios";
import { useFirebaseUser } from "@/context/AuthContext.tsx";

import { BACKEND_URL } from "@/utils/const.tsx";

const CabinetLayout = () => {
  const { user: firebaseUser } = useFirebaseUser();

  useEffect(() => {
    if (!firebaseUser) return;

    axios.post(`${BACKEND_URL}/user/ip`, {
      username: firebaseUser.displayName,
    });
  }, [firebaseUser]);

  return (
    <div className={styles["cabinet"]}>
      <CabinetMenu />
      <div className="container">
        <Outlet />
      </div>
      <Footer />
      <Toaster />
    </div>
  );
};

export default CabinetLayout;
