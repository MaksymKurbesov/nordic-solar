import styles from "./Wallets.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import Wallet from "@SharedUI/Wallet/Wallet.tsx";
import { WALLETS } from "@/utils/const.tsx";
import { useRef } from "react";
import ArrowIcon from "@assets/icons/arrow.svg?react";

const Wallets = ({ wallets }) => {
  const sliderRef = useRef(null);

  return (
    <div className={styles["wallets"]}>
      <h3>Кошельки</h3>
      <div className={`${styles["slider-buttons"]} `}>
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
      <Swiper
        breakpoints={{
          600: {
            slidesPerView: 2,
          },
          800: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
        spaceBetween={10}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => (sliderRef.current = swiper)}
      >
        {Object.entries(wallets).map((wallet, index) => {
          return (
            <SwiperSlide key={index} className={styles["wallet"]}>
              <Wallet wallet={WALLETS[wallet[0]]}>
                <div className={styles["values"]}>
                  <div>
                    <p>Доступно</p>
                    <span>${wallet[1].available}</span>
                  </div>
                  <div>
                    <p>Пополнено</p>
                    <span>${wallet[1].deposited}</span>
                  </div>
                  <div>
                    <p>Выведено</p>
                    <span>${wallet[1].withdrawn}</span>
                  </div>
                  <div>
                    <p>Реферальные</p>
                    <span>${wallet[1].referrals}</span>
                  </div>
                </div>
              </Wallet>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Wallets;
