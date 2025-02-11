import styles from "./Roadmap.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

const getRoadmap = (t) => {
  return [
    {
      year: 2018,
      name: t("roadmap1_title"),
      description: [t("roadmap1_descr1"), t("roadmap1_descr2"), t("roadmap1_descr3"), t("roadmap1_descr4")],
    },
    {
      year: 2019,
      name: "",
      description: [t("roadmap2_descr1"), t("roadmap2_descr2"), t("roadmap2_descr3"), t("roadmap2_descr4")],
    },
    {
      year: 2020,
      name: "",
      description: [t("roadmap3_descr1"), t("roadmap3_descr2"), t("roadmap3_descr3"), t("roadmap3_descr4")],
    },
    {
      year: 2021,
      name: "",
      description: [t("roadmap4_descr1"), t("roadmap4_descr2"), t("roadmap4_descr3"), t("roadmap4_descr4")],
    },
    {
      year: 2022,
      name: "",
      description: [t("roadmap5_descr1"), t("roadmap5_descr2"), t("roadmap5_descr3"), t("roadmap5_descr4")],
    },
    {
      year: 2023,
      name: "",
      description: [t("roadmap6_descr1"), t("roadmap6_descr2"), t("roadmap6_descr3"), t("roadmap6_descr4")],
    },
    {
      year: 2024,
      name: "",
      description: [t("roadmap7_descr1"), t("roadmap7_descr2"), t("roadmap7_descr3"), t("roadmap7_descr4")],
    },
    {
      year: 2025,
      name: "",
      description: [t("roadmap8_descr1"), t("roadmap8_descr2"), t("roadmap8_descr3"), t("roadmap8_descr4")],
    },
    {
      year: 2026,
      name: "",
      description: [t("roadmap9_descr1"), t("roadmap9_descr2"), t("roadmap9_descr3"), t("roadmap9_descr4")],
    },
    {
      year: 2027,
      name: "",
      description: [
        t("roadmap10_descr1"),
        t("roadmap10_descr2"),
        t("roadmap10_descr3"),
        t("roadmap10_descr4"),
      ],
    },
  ];
};

const Roadmap = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const { t } = useTranslation("roadmap");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ delay: 0.5, duration: 0.35 }}
      className={`${styles["roadmap"]}`}
    >
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
        {getRoadmap(t).map((slide, index) => {
          return (
            <SwiperSlide className={styles["roadmap-slide"]} key={index}>
              <p className={styles["year"]}>{slide.year}</p>
              <div className={styles["yearContent"]}>
                <span>0{index}</span>
                <h3>{slide.name}</h3>
                <ul>
                  {slide.description.map((item, index) => {
                    return (
                      <li key={index}>
                        <span>Q{index + 1}</span>
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </motion.div>
  );
};

export default Roadmap;
