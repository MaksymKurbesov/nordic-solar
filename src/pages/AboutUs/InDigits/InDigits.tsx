import styles from "./InDigits.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useTranslation } from "react-i18next";

const getDigits = (t) => {
  return [
    {
      digits: `10 ${t("year")}+`,
      description: t("digits1_descr"),
    },
    {
      digits: "100+",
      description: t("digits2_descr"),
    },
    {
      digits: `500 ${t("million")}+`,
      description: t("digits3_descr"),
    },
    {
      digits: `20 ${t("countries")}+`,
      description: t("digits4_descr"),
    },
    {
      digits: "80%",
      description: t("digits5_descr"),
    },
  ];
};

const InDigits = () => {
  const { t } = useTranslation("aboutUs");

  return (
    <div className={`${styles["roadmap"]}`}>
      <span className={styles["title"]}>{t("digits")}</span>
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        spaceBetween={30}
        mousewheel={true}
        pagination={{
          clickable: true,
        }}
        modules={[Mousewheel, Pagination]}
        className="mySwiper"
      >
        {getDigits(t).map((slide, index) => {
          return (
            <SwiperSlide className={styles["roadmap-slide"]} key={index}>
              <p className={styles["digits"]}>{slide.digits}</p>
              <p className={styles["description"]}>{slide.description}</p>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default InDigits;
