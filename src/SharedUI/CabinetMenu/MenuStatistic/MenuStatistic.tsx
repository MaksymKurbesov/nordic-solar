import styles from "./MenuStatistic.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import InvestedIcon from "@assets/icons/invested.svg?react";
import EarnedIcon from "@assets/icons/earned.svg?react";
import ReferralsIcon from "@assets/icons/referrals.svg?react";
import WithdrawnIcon from "@assets/icons/withdrawn.svg?react";
import ArrowIcon from "@assets/icons/arrow.svg?react";
import { useUser } from "@/hooks/useUser.ts";
import { ReactElement, useRef, useState } from "react";
import { Swiper as SwiperClass } from "swiper";
import { useTranslation } from "react-i18next";

interface IStatistic {
  icon: ReactElement;
  name: string;
  db: string;
}

const getStatistic = (t): IStatistic[] => {
  return [
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
};

const MenuStatistic = () => {
  const { user } = useUser();
  const [menuIsOpened, setMenuIsOpened] = useState(false);
  const sliderRef = useRef<SwiperClass | null>(null);
  const { t, i18n } = useTranslation("cabinet");

  return (
    <>
      <div className={styles["statistic-header"]}>
        <button
          className={`${styles["statistic-button"]} ${menuIsOpened ? styles["opened"] : ""}`}
          onClick={() => {
            setMenuIsOpened((prevState) => !prevState);
          }}
        >
          <ArrowIcon />
          {t("cabinet_statistic")}
        </button>
        <div className={`${styles["slider-buttons"]} ${menuIsOpened ? styles["opened"] : ""}`}>
          <button onClick={() => sliderRef.current?.slidePrev()} className={styles["prev-button"]}>
            <ArrowIcon />
          </button>
          <button onClick={() => sliderRef.current?.slideNext()} className={styles["next-button"]}>
            <ArrowIcon />
          </button>
        </div>
      </div>
      <div className={`${styles["bottom-row"]} ${menuIsOpened ? styles["opened"] : ""}`}>
        <ul className={styles["statistic-list"]}>
          <Swiper
            loop={false}
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
            onSwiper={(swiper) => (sliderRef.current = swiper)}
          >
            {getStatistic(t).map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <li key={item.name}>
                    <div className={styles["header"]}>
                      {item.icon}
                      <p>{t(item.name)}</p>
                    </div>
                    <div className={styles["values"]}>
                      <div className={styles["total"]}>
                        <p>{t("total")}</p>
                        <span>${user[item.db].toFixed(2)}</span>
                      </div>
                    </div>
                  </li>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </ul>
      </div>
    </>
  );
};

export default MenuStatistic;
