import styles from "./Wallets.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper";
import { WALLETS } from "@/utils/const.tsx";
import { FC, useRef } from "react";
import ArrowIcon from "@assets/icons/arrow.svg?react";
import { IWallets } from "@/interfaces/IWallets.ts";
import { useTranslation } from "react-i18next";

interface IWalletsProps {
  wallets: IWallets;
}

const Wallets: FC<IWalletsProps> = ({ wallets }) => {
  const { t } = useTranslation("cabinet");

  const sliderRef = useRef<SwiperClass | null>(null);

  const goToPrevSlide = (): void => {
    sliderRef.current?.slidePrev();
  };

  const goToNextSlide = (): void => {
    sliderRef.current?.slideNext();
  };

  return (
    <div className={styles["wallets"]}>
      <div className={styles["wallets-header"]}>
        <h3>{t("wallets")}</h3>
        <div className={`${styles["slider-buttons"]} `}>
          <button onClick={goToPrevSlide} className={styles["prev-button"]}>
            <ArrowIcon />
          </button>
          <button onClick={goToNextSlide} className={styles["next-button"]}>
            <ArrowIcon />
          </button>
        </div>
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
        onSwiper={(swiper) => (sliderRef.current = swiper)}
        className={styles["swiper-padding"]}
      >
        {Object.entries(wallets).map((wallet, index) => {
          const walletName = wallet[0];
          const walletData = wallet[1];
          const additionalWalletData = WALLETS[walletName];

          return (
            <SwiperSlide key={index} className={`${styles["wallet"]} ${additionalWalletData.currency}`}>
              <div className={styles["header"]}>
                <div className={`${styles["icon"]} icon`}>{additionalWalletData.icon}</div>
                <p className={styles["name"]}>{additionalWalletData.name}</p>
                <span>{additionalWalletData.currency}</span>
              </div>
              <div className={styles["values"]}>
                <div>
                  <p>{t("available")}</p>
                  <span>${walletData.available.toFixed(2)}</span>
                </div>
                <div>
                  <p>{t("deposited")}</p>
                  <span>${walletData.deposited.toFixed(2)}</span>
                </div>
                <div>
                  <p>{t("withdrawn")}</p>
                  <span>${walletData.withdrawn.toFixed(2)}</span>
                </div>
                <div>
                  <p>{t("referrals")}</p>
                  <span>${walletData.referrals.toFixed(2)}</span>
                </div>
              </div>
              {/*</Wallet>*/}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Wallets;
