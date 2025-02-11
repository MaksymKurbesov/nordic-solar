import Logo from "@assets/logo.svg?react";
import styles from "./CabinetMenu.module.scss";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import UserAvatar from "@assets/images/user.png";
import { auth, userService } from "@/main.tsx";
import { useUser } from "@/hooks/useUser.ts";
import MenuStatistic from "@SharedUI/CabinetMenu/MenuStatistic/MenuStatistic.tsx";
import { ReactElement, useEffect, useState } from "react";
import DrawerMobileMenu from "@SharedUI/CabinetMenu/DrawerMobileMenu/DrawerMobileMenu.tsx";
import CabinetIcon from "@assets/icons/mobile-menu/cabinet.svg?react";
import OpenDepositIcon from "@assets/icons/mobile-menu/open-deposit.svg?react";
import CashInIcon from "@assets/icons/mobile-menu/cash-in.svg?react";
import WithdrawnIcon from "@assets/icons/mobile-menu/withdrawn.svg?react";
import TransactionsIcon from "@assets/icons/mobile-menu/transactions.svg?react";
import ReferralsIcon from "@assets/icons/mobile-menu/referrals.svg?react";
import { useTranslation } from "react-i18next";
import CustomSelect from "@SharedUI/CustomSelect/CustomSelect.tsx";

export interface ILink {
  text: string;
  link: string;
  icon: ReactElement;
}

export const getLinks = (t): ILink[] => {
  return [
    {
      text: t("cabinet"),
      link: "/cabinet/main",
      icon: <CabinetIcon />,
    },
    {
      text: t("open_plan"),
      link: "/cabinet/open-plan/plans",
      icon: <OpenDepositIcon />,
    },
    {
      text: t("topup_balance"),
      link: "/cabinet/make-deposit",
      icon: <CashInIcon />,
    },
    {
      text: t("withdrawn"),
      link: "/cabinet/withdrawn",
      icon: <WithdrawnIcon />,
    },
    {
      text: t("transactions"),
      link: "/cabinet/transactions",
      icon: <TransactionsIcon />,
    },
    {
      text: t("referrals"),
      link: "/cabinet/referrals",
      icon: <ReferralsIcon />,
    },
  ];
};

const CabinetMenu = () => {
  const { user } = useUser();
  const [mobileMenuDrawerIsOpen, setMobileMenuDrawerIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [userAvatar, setUserAvatar] = useState("");
  const [language, setLanguage] = useState("en");
  const { t, i18n } = useTranslation("menu");

  const handleChange = (event) => {
    setLanguage(event.target.value as string);
    i18n.changeLanguage(event.target.value);
  };

  useEffect(() => {
    if (!auth.currentUser) return;

    if (auth.currentUser.photoURL) {
      setUserAvatar(auth.currentUser.photoURL);
    } else {
      setUserAvatar(UserAvatar);
    }
  }, [auth.currentUser]);

  useEffect(() => {
    setMobileMenuDrawerIsOpen(false);
  }, [location.pathname]);

  if (!user) return null;

  return (
    <div className={`${styles.menu}`}>
      <div className={styles["top-row"]}>
        <div
          className={styles["mobile-hamburger"]}
          onClick={() => {
            setMobileMenuDrawerIsOpen(true);
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <NavLink to={"/"} className={styles["logotype"]}>
          <Logo width={120} />
        </NavLink>
        <nav className={styles.navigation}>
          <ul>
            {getLinks(t).map((item) => {
              return (
                <li key={item.link}>
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isPending ? styles["pending"] : isActive ? styles["active"] : ""
                    }
                    to={item.link}
                  >
                    {item.text}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
        <CustomSelect />
        {/*<select value={language} onChange={handleChange}>*/}
        {/*  <option value={"ru"}>Русский</option>*/}
        {/*  <option value={"en"}>English</option>*/}
        {/*</select>*/}
        <div className={styles["user"]}>
          <img src={userAvatar} alt={""} />
          <div className={styles["user-wrapper"]}>
            <p>{user.nickname}</p>
            <NavLink to={"/cabinet/settings"}>{t("settings")}</NavLink>
          </div>
        </div>
        <button
          onClick={async () => {
            await userService.logout();
            navigate("/");
          }}
          className={styles["quit-button"]}
        >
          {t("logout")}
        </button>
      </div>
      <MenuStatistic />
      <DrawerMobileMenu open={mobileMenuDrawerIsOpen} setOpen={setMobileMenuDrawerIsOpen} />
    </div>
  );
};

export default CabinetMenu;
