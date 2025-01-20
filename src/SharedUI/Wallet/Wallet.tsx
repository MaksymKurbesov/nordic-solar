import styles from './Wallet.module.scss'
import { IShortWalletData } from '@/interfaces/IWallets.ts'
import { FC, ReactNode } from 'react'

interface IWalletProps {
  wallet: IShortWalletData
  children: ReactNode
}

const Wallet: FC<IWalletProps> = ({ wallet, children }) => {
  if (!wallet) return

  return (
    <div className={`${styles['wallet-slide']} ${wallet.currency}`}>
      <div className={styles['header']}>
        <div className={`${styles['icon']} icon`}>{wallet.icon}</div>
        <p>{wallet.name}</p>
        <span>{wallet.currency}</span>
      </div>
      {children}
    </div>
  )
}

export default Wallet
