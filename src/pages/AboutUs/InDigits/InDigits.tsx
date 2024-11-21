import styles from "./InDigits.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const DIGITS = [
  {
    digits: "10 лет+",
    description: "опыта в сфере инвестиций в зеленую энергетику."
  },
  {
    digits: "100+",
    description: "успешных проектов в солнечной и ветроэнергетике."
  },
  {
    digits: "500 млн+",
    description: "евро инвестиций в устойчивое будущее."
  },
  {
    digits: "20 стран+",
    description: "охвачено нашими инициативами."
  },
  {
    digits: "80%",
    description: "возврат инвестиций для наших партнеров."
  },
];

const InDigits = () => {
  return (
    <div className={`${styles["roadmap"]}`}>
      <span className={styles['title']}>Мы в цифрах</span>
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
        {DIGITS.map((slide, index) => {
          return (
            <SwiperSlide className={styles["roadmap-slide"]} key={index}>
              <p className={styles['digits']}>{slide.digits}</p>
              <p className={styles['description']}>{slide.description}</p>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default InDigits;
