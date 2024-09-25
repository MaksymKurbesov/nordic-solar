import Logo from "@assets/logo.svg?react";
import styles from "./Menu.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Menu = () => {
  const [isIndexPage, setIsIndexPage] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setIsIndexPage(true);
    } else {
      setIsIndexPage(false);
    }
  }, [location]);

  return (
    <div
      className={`${styles.menu} ${isIndexPage ? styles.menuIndex : ""} container`}
    >
      <NavLink className={styles["logotype"]} to={"/"}>
        <Logo />
      </NavLink>
      <nav className={styles.navigation}>
        <ul className={styles["navigation-list"]}>
          <li>
            <NavLink
              to={"/products"}
              className={({ isActive, isPending }) =>
                isPending ? styles["pending"] : isActive ? styles["active"] : ""
              }
            >
              Продукты
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/investments"}
              className={({ isActive, isPending }) =>
                isPending ? styles["pending"] : isActive ? styles["active"] : ""
              }
            >
              Инвестиции
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/about-us"}
              className={({ isActive, isPending }) =>
                isPending ? styles["pending"] : isActive ? styles["active"] : ""
              }
            >
              О нас
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/faq"}
              className={({ isActive, isPending }) =>
                isPending ? styles["pending"] : isActive ? styles["active"] : ""
              }
            >
              FAQ
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/contacts"}
              className={({ isActive, isPending }) =>
                isPending ? styles["pending"] : isActive ? styles["active"] : ""
              }
            >
              Контакты
            </NavLink>
          </li>
        </ul>
      </nav>
      <NavLink to={"/sign-in"} className={styles.signInButton}>
        Войти
      </NavLink>
      <button className={styles.contactUsButton}>Связаться с нами</button>
    </div>
  );
};

export default Menu;
