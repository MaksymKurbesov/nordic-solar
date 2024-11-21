import styles from "./MobileMenu.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "@assets/logo.svg?react";
import { useEffect, useState } from "react";
import useWindowSize from "@/hooks/useWindowSize.ts";

const MobileMenu = () => {
  const [menuIsOpened, setMenuIsOpened] = useState(false);
  const windowSize = useWindowSize();
  const location = useLocation();
  const isMobile = windowSize.width < 767;


  useEffect(() => {
    setMenuIsOpened(false);
  }, [location.pathname]);

  if (!isMobile) return null;

  return (
    <>
      <div
        className={`${styles["menu-overlay"]} ${menuIsOpened ? styles["menu-opened"] : ""}`}
      >
        <div className={styles["menu-content"]}>
          <nav className={styles['navigation']}>
            <NavLink className={styles["logotype"]} to={"/"}>
              <Logo />
            </NavLink>
            <ul className={styles["navigation-list"]}>
              <li>
                <NavLink to={"/products"}>Продукты</NavLink>
              </li>
              <li>
                <NavLink to={"/investments"}>Инвестиции</NavLink>
              </li>
              <li>
                <NavLink to={"/about-us"}>О нас</NavLink>
              </li>
              <li>
                <NavLink to={"/faq"}>FAQ</NavLink>
              </li>
              <li>
                <NavLink to={"/contacts"}>Контакты</NavLink>
              </li>
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
