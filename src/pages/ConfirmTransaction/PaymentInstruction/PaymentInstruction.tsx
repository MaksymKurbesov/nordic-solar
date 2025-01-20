import styles from './PaymentInstruction.module.scss'
import { OUR_WALLETS } from '@/utils/OUR_WALLETS.tsx'
import CopyIcon from '@assets/icons/copy.svg?react'
import IconCircleCheckFilled from '@/assets/icons/circle-check.svg?react'
import { Dispatch, FC, SetStateAction } from 'react'

interface IPaymentInstruction {
  wallet: string
  transactionHash: string
  setTransactionHash: Dispatch<SetStateAction<string>>
  copyWalletHandler: () => void
}

const PaymentInstruction: FC<IPaymentInstruction> = ({
  wallet,
  transactionHash,
  setTransactionHash,
  copyWalletHandler,
}) => {
  return (
    <div className={styles['instruction']}>
      <h2>Инструкции по переводу платежа</h2>
      <ul>
        <li className={styles['completed']}>
          <p>1. Выбор платежной системы</p>
          <IconCircleCheckFilled width={17} />
        </li>
        <li className={styles['completed']}>
          <p>2. Укажите сумму пополнения</p>
          <IconCircleCheckFilled width={17} />
        </li>
        <li>
          <p>3. Произведите оплату по указанным реквизитам</p>
          <div className={styles['wallet-address-wrapper']}>
            <p className={styles['wallet-address']} onClick={copyWalletHandler}>
              <span>{OUR_WALLETS[wallet]}</span> <CopyIcon />
            </p>
            <p className={styles['title']}>Адрес кошелька {wallet}</p>
          </div>
        </li>
        <li>
          <p>4. Подтвердите транзакцию, введя номер/хэш транзакции ниже</p>
          <input
            value={transactionHash}
            onChange={(e) => setTransactionHash(e.target.value)}
            placeholder={'Хеш транзакции'}
          />
        </li>
      </ul>
    </div>
  )
}

export default PaymentInstruction
