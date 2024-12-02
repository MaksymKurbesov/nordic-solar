import styles from './Wallets.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import Wallet from '@SharedUI/Wallet/Wallet.tsx'
import { WALLETS } from '@/utils/const.tsx'
import { useRef } from 'react'
import ArrowIcon from '@assets/icons/arrow.svg?react'

const Wallets = ({ wallets }) => {
  const sliderRef = useRef(null)

  return (
    <div className={styles['wallets']}>
      <h3>Кошельки</h3>
      <div className={`${styles['slider-buttons']} `}>
        <button
          onClick={() => sliderRef.current.slidePrev()}
          className={styles['prev-button']}
        >
          <ArrowIcon />
        </button>
        <button
          onClick={() => sliderRef.current.slideNext()}
          className={styles['next-button']}
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
        onSwiper={(swiper) => (sliderRef.current = swiper)}
      >
        {Object.entries(wallets).map((wallet, index) => {
          const walletName = wallet[0]
          const walletData = wallet[1]
          const additionalWalletData = WALLETS[walletName]

          return (
            <SwiperSlide
              key={index}
              className={`${styles['wallet']} ${additionalWalletData.currency}`}
            >
              <div className={styles['header']}>
                <div className={`${styles['icon']} icon`}>
                  {additionalWalletData.icon}
                </div>
                <p className={styles['name']}>{additionalWalletData.name}</p>
                <span>{additionalWalletData.currency}</span>
              </div>
              <div className={styles['values']}>
                <div>
                  <p>Доступно</p>
                  <span>${walletData.available.toFixed(2)}</span>
                </div>
                <div>
                  <p>Пополнено</p>
                  <span>${walletData.deposited.toFixed(2)}</span>
                </div>
                <div>
                  <p>Выведено</p>
                  <span>${walletData.withdrawn.toFixed(2)}</span>
                </div>
                <div>
                  <p>Реферальные</p>
                  <span>${walletData.referrals.toFixed(2)}</span>
                </div>
              </div>
              {/*</Wallet>*/}
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default Wallets
