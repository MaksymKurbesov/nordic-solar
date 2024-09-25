import Logo from "@assets/logo.svg?react";
import styles from "./CabinetMenu.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import UserAvatar from "@assets/images/user.png";
import ArrowIcon from "@assets/icons/arrow.svg?react";
import InvestedIcon from "@assets/icons/invested.svg?react";
import EarnedIcon from "@assets/icons/earned.svg?react";
import ReferralsIcon from "@assets/icons/referrals.svg?react";
import WithdrawnIcon from "@assets/icons/withdrawn.svg?react";
import { userService } from "@/main.tsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { useUser } from "@/hooks/useUser.ts";

export const LINKS = [
  {
    text: "Кабинет",
    link: "/cabinet/main",
  },
  {
    text: "Открыть план",
    link: "/cabinet/open-plan/plans",
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
    db: "invested",
  },
  {
    icon: <EarnedIcon width={24} height={24} />,
    name: "Заработано",
    db: "earned",
  },
  {
    icon: <WithdrawnIcon width={24} height={24} />,
    name: "Выведено",
    db: "withdrawn",
  },
  {
    icon: <ReferralsIcon width={24} height={24} />,
    name: "Реферальной программой",
    db: "referrals",
  },
];

const Menu = () => {
  const [isIndexPage, setIsIndexPage] = useState(false);
  const location = useLocation();
  const [menuIsOpened, setMenuIsOpened] = useState(false);
  const sliderRef = useRef(null);
  const { user } = useUser();

  useEffect(() => {
    if (location.pathname === "/") {
      setIsIndexPage(true);
    } else {
      setIsIndexPage(false);
    }
  }, [location]);

  if (!user) return null;

  return (
    <div className={`${styles.menu} ${isIndexPage ? styles["menuIndex"] : ""}`}>
      <div className={styles["top-row"]}>
        <NavLink to={"/"} className={styles["logotype"]}>
          <Logo />
        </NavLink>
        <nav className={styles.navigation}>
          <ul>
            {LINKS.map((item) => {
              return (
                <li key={item.link}>
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isPending
                        ? styles["pending"]
                        : isActive
                          ? styles["active"]
                          : ""
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
      <button
        className={`${styles["statistic-button"]} ${
          menuIsOpened ? styles["opened"] : ""
        }`}
        onClick={() => {
          setMenuIsOpened((prevState) => !prevState);
        }}
      >
        <ArrowIcon />
        Статистика кабинета
      </button>
      <div
        className={`${styles["slider-buttons"]} ${
          menuIsOpened ? styles["opened"] : ""
        }`}
      >
        <button
          onClick={() => sliderRef.current.slidePrev()}
          className={styles["prev-button"]}
        >
          <ArrowIcon />
        </button>
        <button
          onClick={() => sliderRef.current.slideNext()}
          className={styles["next-button"]}
        >
          <ArrowIcon />
        </button>
      </div>
      <div
        className={`${styles["bottom-row"]} ${
          menuIsOpened ? styles["opened"] : ""
        }`}
      >
        <ul className={styles["statistic-list"]}>
          <Swiper
            loop
            spaceBetween={10}
            breakpoints={{
              600: {
                slidesPerView: 2,
              },
              850: {
                slidesPerView: 3,
              },
              1200: {
                slidesPerView: 4,
              },
            }}
            slidesPerView={1}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => (sliderRef.current = swiper)}
          >
            {STATISTIC.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <li key={item.name}>
                    <div className={styles["header"]}>
                      {item.icon}
                      <p>{item.name}</p>
                    </div>
                    <div className={styles["values"]}>
                      <div className={styles["last-month"]}>
                        <p>За месяц</p>
                        <span>$4 534.60</span>
                      </div>
                      <div className={styles["total"]}>
                        <p>Всего</p>
                        <span>${user[item.db]}</span>
                      </div>
                    </div>
                  </li>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
