import Logo from "@assets/logo.svg?react";
import styles from "./CabinetMenu.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import UserAvatar from "@assets/images/user.png";
import ArrowIcon from "@assets/icons/arrow.svg?react";
import InvestedIcon from "@assets/icons/invested.svg?react";
import EarnedIcon from "@assets/icons/earned.svg?react";
import ReferralsIcon from "@assets/icons/referrals.svg?react";
import WithdrawnIcon from "@assets/icons/withdrawn.svg?react";
import { userService } from "@/main.tsx";

const LINKS = [
  {
    text: "Кабинет",
    link: "/cabinet/main",
  },
  {
    text: "Пополнить счет",
    link: "/cabinet/make-deposit",
  },
  {
    text: "Вывод средств",
    link: "/cabinet/withdrawn",
  },
  {
    text: "Транзакции",
    link: "/cabinet/transactions",
  },
  {
    text: "Рефералы",
    link: "/cabinet/referrals",
  },
];

const STATISTIC = [
  {
    icon: <InvestedIcon width={24} height={24} />,
    name: "Инвестировано",
  },
  {
    icon: <EarnedIcon width={24} height={24} />,
    name: "Заработано",
  },
  {
    icon: <WithdrawnIcon width={24} height={24} />,
    name: "Выведено",
  },
  {
    icon: <ReferralsIcon width={24} height={24} />,
    name: "Реферальной программой",
  },
];

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
    <div className={`${styles.menu} ${isIndexPage ? styles.menuIndex : ""}`}>
      <div className={styles["top-row"]}>
        <NavLink to={"/"} className={styles["logotype"]}>
          <Logo />
        </NavLink>
        <nav className={styles.navigation}>
          <ul>
            {LINKS.map((item) => {
              return (
                <li key={item.link}>
                  <NavLink to={item.link}>{item.text}</NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className={styles["user"]}>
          <img src={UserAvatar} alt={""} />
          <div className={styles["user-wrapper"]}>
            <p>Джон Ватсон</p>
            <NavLink to={"/cabinet/settings"}>Настройки</NavLink>
          </div>
        </div>
        <button
          onClick={() => {
            userService.logout();
          }}
          className={styles["quit-button"]}
        >
          Выйти
        </button>
      </div>
      <div className={styles["bottom-row"]}>
        <button className={styles["statistic-button"]}>
          <ArrowIcon />
          Статистика кабинета
        </button>
        <ul className={styles["statistic-list"]}>
          {STATISTIC.map((item) => {
            return (
              <li key={item.name}>
                <div className={styles["header"]}>
                  {item.icon}
                  {item.name}
                </div>
                <div className={styles["values"]}>
                  <div className={styles["last-month"]}>
                    <p>За последний месяц</p>
                    <span>$4 534.60</span>
                  </div>
                  <div className={styles["total"]}>
                    <p>Всего</p>
                    <span>$4 534.60</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
