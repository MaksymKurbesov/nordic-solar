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
import { useState } from 'react'

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

  const toggleItem = (index) => {
    setOpenedDeposits((prev) => {
      // Проверяем, есть ли индекс уже в массиве
      if (prev.includes(index)) {
        // Если есть, удаляем его (закрытие)
        return prev.filter((i) => i !== index)
      } else {
        // Если нет, добавляем его (открытие)
        return [...prev, index]
      }
    })
  }

  return (
    <div
      className={`${styles['deposits-list-wrapper']} ${isActive ? styles['active-deposits'] : ''}`}
    >
      <ul className={styles['deposits-list']}>
        {deposits.map((deposit, index) => (
          <li
            key={index}
            className={`${openedDeposits.includes(index) ? styles['opened'] : ''}`}
            onClick={
              () => toggleItem(index)
              // setOpenedDeposits((prev) => {
              //   if (prev.includes(index)) {
              //     setOpenedDeposits(prev.splice(prev.indexOf(index)))
              //   } else {
              //     setOpenedDeposits([...prev, index])
              //   }
              // })
            }
          >
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
                    <div className={styles['value']}>{value}</div>
                  </div>
                )
              })}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DepositsList
