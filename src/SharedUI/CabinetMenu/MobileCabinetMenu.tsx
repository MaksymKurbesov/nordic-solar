import styles from "./MobileCabinetMenu.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "@assets/logo.svg?react";
import { useEffect, useState } from "react";
import useWindowSize from "@/hooks/useWindowSize.ts";
import { LINKS } from "@SharedUI/CabinetMenu/CabinetMenu";

const MobileMenu = () => {
  const [menuIsOpened, setMenuIsOpened] = useState(false);
  const windowSize = useWindowSize();
  const location = useLocation();
  const isMobile = windowSize.width < 1200;

  useEffect(() => {
    setMenuIsOpened(false);
  }, [location.pathname]);

  if (!isMobile) return null;

  return (
    <>
      <div
        className={`${styles["menu-overlay"]} ${
          menuIsOpened ? styles["menu-opened"] : ""
        }`}
      >
        <div className={styles["menu-content"]}>
          <nav className={styles["navigation"]}>
            <NavLink className={styles["logotype"]} to={"/"}>
              <Logo />
            </NavLink>
            <ul className={styles["navigation-list"]}>
              {LINKS.map((item) => {
                return (
                  <li key={item.link}>
                    <NavLink to={item.link}>{item.text}</NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        <div
          onClick={() => setMenuIsOpened(false)}
          className={styles["close-button"]}
        >
          <span></span>
          <span></span>
        </div>
      </div>
      <div
        onClick={() => {
          setMenuIsOpened(true);
        }}
        className={`${styles["mobile-menu"]}`}
      >
        <span></span>
        <span></span>
      </div>
    </>
  );
};

export default MobileMenu;
