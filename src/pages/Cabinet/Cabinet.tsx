import styles from "./Cabinet.module.scss";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "@SharedUI/Footer/Footer.tsx";
import CabinetMenu from "@SharedUI/CabinetMenu/CabinetMenu.tsx";
import { useEffect } from "react";
import { useAuthState } from "@/hooks/useAuthState.ts";
import { auth, userService } from "@/main.tsx";
import MobileCabinetMenu from "@SharedUI/CabinetMenu/MobileCabinetMenu";
import { useUser } from "@/hooks/useUser.ts";

const Cabinet = () => {
  const [user, userLoading] = useAuthState(auth, { onUserChanged: true });
  const navigate = useNavigate();

  const { setUser } = useUser();

  useEffect(() => {
    if (!user && !userLoading) navigate("/");

    const fetchUserData = async () => {
      if (!user) return;

      const userData = await userService.getUser(user.displayName);
      setUser(userData);
    };

    fetchUserData();
  }, [user]);

  return (
    <div className={styles["cabinet"]}>
      <CabinetMenu />
      <div className={"container"}>
        <Outlet />
      </div>
      <Footer />
      <MobileCabinetMenu />
    </div>
  );
};

export default Cabinet;
