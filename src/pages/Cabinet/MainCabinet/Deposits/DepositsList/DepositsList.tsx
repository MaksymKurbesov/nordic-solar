import styles from './DepositsList.module.scss'
import VariantIcon from '@assets/icons/deposit-icons/variant.svg?react'
import ProgressIcon from '@assets/icons/deposit-icons/progress.svg?react'
import AccrualIcon from '@assets/icons/deposit-icons/accrual.svg?react'
import WalletIcon from '@assets/icons/deposit-icons/wallet.svg?react'
import AmountIcon from '@assets/icons/deposit-icons/amount.svg?react'
import ReceivedIcon from '@assets/icons/deposit-icons/received.svg?react'
import WillReceivedIcon from '@assets/icons/deposit-icons/willReceived.svg?react'
import OpenDateIcon from '@assets/icons/deposit-icons/openDate.svg?react'
import CloseDateIcon from '@assets/icons/deposit-icons/closeDate.svg?react'
import { useEffect, useState } from 'react'
import SolarFutureImage from '@assets/images/investments/solar-future-hero.webp'
import WindProsperityImage from '@assets/images/investments/wind-prosperity-hero.webp'
import HydroImage from '@assets/images/investments/hydro-hero.webp'
import HydrogenImage from '@assets/images/investments/hydrogen-hero.webp'
import MiningFarmsImage from '@assets/images/investments/mining-farm-hero.webp'
import { transformDeposit } from '@/utils/helpers.tsx'

const PLANS_IMAGE_MAP = {
  solar: SolarFutureImage,
  wind: WindProsperityImage,
  hydro: HydroImage,
  hydrogen: HydrogenImage,
  mining: MiningFarmsImage,
}

const PLANS_NAME_MAP = {
  solar: {
    beginner: 'Sunlight Start',
    available: 'Solar Expansion',
    optimal: 'Radiant Yield',
    maximum: 'Solar Innovate',
  },
  wind: {
    beginner: 'Breeze Start',
    available: 'Wind Fields',
    optimal: 'Aero Advantage',
    maximum: 'Turbine Tech',
  },
  hydro: {
    beginner: 'River Flow',
    available: 'Hydro Expansion',
    optimal: 'EcoHydro',
    maximum: 'Blue Energy R&D',
  },
  hydrogen: {
    beginner: 'H2 Mining Start',
    available: 'Green Hydrogen Expansion',
    optimal: 'Hydrogen Fuel Cells',
    maximum: 'Mining Power',
  },
  mining: {
    beginner: 'CryptoGrow',
    available: 'ProfitMine',
  },
}

const COLUMNS_ICON = {
  variant: <VariantIcon width={15} />,
  progress: <ProgressIcon width={15} />,
  nextAccrual: <AccrualIcon width={15} />,
  wallet: <WalletIcon width={15} />,
  amount: <AmountIcon width={15} />,
  received: <ReceivedIcon width={15} />,
  willReceived: <WillReceivedIcon width={15} />,
  openDate: <OpenDateIcon width={15} />,
  closeDate: <CloseDateIcon width={15} />,
}

const DepositsList = ({ deposits, columns, isActive }) => {
  const [openedDeposits, setOpenedDeposits] = useState([])
  const [userDeposits, setUserDeposits] = useState([])

  useEffect(() => {
    // if (deposits) {
    //   console.log(deposits.map(transformDeposit), 'deposits')
    // }
    // setUserDeposits(deposits.map(transformDeposit))
  }, [deposits])

  const toggleItem = (index) => {
    setOpenedDeposits((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index)
      } else {
        return [...prev, index]
      }
    })
  }

  return (
    <div
      className={`${styles['deposits-list-wrapper']} ${isActive ? styles['active-deposits'] : ''}`}
    >
      <ul className={styles['deposits-list']}>
        {deposits.map((deposit, index) => {
          const { plan, variant } = deposit

          return (
            <li
              key={index}
              className={`${openedDeposits.includes(index) ? styles['opened'] : ''}`}
              onClick={() => toggleItem(index)}
            >
              <img src={PLANS_IMAGE_MAP[plan]} alt={'SolarFutureImage'} />
              <div>
                {columns.map((column) => {
                  const value = deposit[column.key]
                  return (
                    <div
                      key={column.key}
                      className={`${styles['cell']} ${styles[column.key]}`}
                    >
                      <span className={styles['label']}>
                        {COLUMNS_ICON[column.key]}
                        {column.title}
                      </span>
                      <div className={styles['value']}>
                        {column.key === 'variant'
                          ? PLANS_NAME_MAP[plan][variant]
                          : value}
                      </div>
                    </div>
                  )
                })}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default DepositsList
