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

const DepositsList = ({ deposits, columns }) => {
  return (
    <div className={styles['deposits-list-wrapper']}>
      <ul className={styles['deposits-list']}>
        {deposits.map((deposit, index) => (
          <li key={index}>
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
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DepositsList
