import styles from "./Cabinet.module.scss";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "@SharedUI/Footer/Footer.tsx";
import CabinetMenu from "@SharedUI/CabinetMenu/CabinetMenu.tsx";
import { useEffect } from "react";
import { useAuthState } from "@/hooks/useAuthState.ts";
import { auth } from "@/main.tsx";

const Cabinet = () => {
  const [user, userLoading] = useAuthState(auth, { onUserChanged: true });
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !userLoading) navigate("/");
  }, [user]);

  return (
    <div className={styles["cabinet"]}>
      <CabinetMenu />
      <div className={"container"}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Cabinet;
