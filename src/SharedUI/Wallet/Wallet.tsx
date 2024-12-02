import styles from './Wallet.module.scss'

const Wallet = ({ wallet, children }) => {
  if (!wallet) return

  console.log(wallet.currency, 'wallet.currency')

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
