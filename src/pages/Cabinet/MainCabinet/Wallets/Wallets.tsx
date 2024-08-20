import styles from "./Wallets.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import Wallet from "@SharedUI/Wallet/Wallet.tsx";
import { WALLETS } from "@/utils/const.tsx";

const Wallets = () => {
  return (
    <div className={styles["wallets"]}>
      <h3>Кошельки</h3>
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
        onSwiper={(swiper) => console.log(swiper)}
      >
        {WALLETS.map((wallet, index) => {
          return (
            <SwiperSlide key={index}>
              <Wallet wallet={wallet}>
                <div className={styles["values"]}>
                  <div>
                    <p>Доступно</p>
                    <span>$1 534.60</span>
                  </div>
                  <div>
                    <p>Пополнено</p>
                    <span>$1 252.60</span>
                  </div>
                  <div>
                    <p>Выведено</p>
                    <span>$234.60</span>
                  </div>
                  <div>
                    <p>Реферальные</p>
                    <span>$634.60</span>
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
