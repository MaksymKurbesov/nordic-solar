import styles from './MainCabinet.module.scss'
import Wallets from '@/pages/Cabinet/MainCabinet/Wallets/Wallets.tsx'
import Deposits from '@/pages/Cabinet/MainCabinet/Deposits/Deposits.tsx'
import NextAccrual from '@/pages/Cabinet/MainCabinet/NextAccrual/NextAccrual.tsx'
import LastTransactions from '@/pages/Cabinet/MainCabinet/LastTransactions/LastTransactions.tsx'
import { useUser } from '@/hooks/useUser.ts'
import { useEffect, useState } from 'react'
import { depositService, transactionService } from '@/main.tsx'
import {
  getClosestDeposit,
  sortByAvailable,
  transformTransaction,
} from '@/utils/helpers.tsx'

const MainCabinet = () => {
  const { user, wallets } = useUser()
  const [transactions, setTransactions] = useState(null)
  const [deposits, setDeposits] = useState([])
  const closestDeposit = getClosestDeposit(deposits)
  const [nextAccrual, setNextAccrual] = useState(null)

  useEffect(() => {
    if (!user) return

    const unsubscribeDeposits = depositService.getAllDeposits(
      setDeposits,
      user.nickname,
    )

    const unsubscribe = transactionService.subscribeToLastTenTransactions(
      user.nickname,
      (updatedTransactions) => {
        setTransactions(updatedTransactions.map(transformTransaction))
      },
    )

    return () => unsubscribe()
  }, [user])

  useEffect(() => {
    if (closestDeposit) {
      const dayInMillis = 24 * 60 * 60 * 1000
      const accrual =
        closestDeposit.deposit.lastAccrual.toMillis() + dayInMillis
      setNextAccrual(accrual)
    }
  }, [closestDeposit])

  if (!user || !transactions) return null

  return (
    <div className={styles['main-cabinet']}>
      <Wallets wallets={sortByAvailable(wallets)} />
      <Deposits deposits={deposits} />
      <div className={styles['accrual-wrapper']}>
        <NextAccrual nextAccrual={nextAccrual} />
        <LastTransactions transactions={transactions.slice(0, 4)} />
      </div>
    </div>
  )
}

export default MainCabinet
