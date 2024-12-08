import styles from './MainCabinet.module.scss'
import Wallets from '@/pages/Cabinet/MainCabinet/Wallets/Wallets.tsx'
import Deposits from '@/pages/Cabinet/MainCabinet/Deposits/Deposits.tsx'
import NextAccrual from '@/pages/Cabinet/MainCabinet/NextAccrual/NextAccrual.tsx'
import LastTransactions from '@/pages/Cabinet/MainCabinet/LastTransactions/LastTransactions.tsx'
import { useUser } from '@/hooks/useUser.ts'
import { sortByAvailable } from '@/utils/helpers.tsx'

const MainCabinet = () => {
  const { user } = useUser()

  if (!user) return null

  return (
    <div className={styles['main-cabinet']}>
      <Wallets wallets={sortByAvailable(user.wallets)} />
      <Deposits deposits={user.deposits} />
      <div className={styles['accrual-wrapper']}>
        <NextAccrual deposits={user.deposits} />
        <LastTransactions transactions={user.transactions} />
      </div>
    </div>
  )
}

export default MainCabinet
