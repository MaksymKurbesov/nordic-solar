import styles from './MainCabinet.module.scss'
import Wallets from '@/pages/Cabinet/MainCabinet/Wallets/Wallets.tsx'
import Deposits from '@/pages/Cabinet/MainCabinet/Deposits/Deposits.tsx'
import NextAccrual from '@/pages/Cabinet/MainCabinet/NextAccrual/NextAccrual.tsx'
import LastTransactions from '@/pages/Cabinet/MainCabinet/LastTransactions/LastTransactions.tsx'
import { useUser } from '@/hooks/useUser.ts'
import { useEffect, useState } from 'react'
import {
  auth,
  depositService,
  transactionService,
  userService,
  walletsService,
} from '@/main.tsx'
import {
  fetchUserIP,
  getClosestDeposit,
  sortByAvailable,
  transformTransaction,
} from '@/utils/helpers.tsx'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from '@/hooks/useAuthState.ts'

const MainCabinet = () => {
  // const { user } = useUser()
  const [transactions, setTransactions] = useState(null)
  const [closestDeposit, setClosestDeposit] = useState(null)

  const navigate = useNavigate()
  const [firebaseUser, userLoading] = useAuthState(auth, {
    onUserChanged: true,
  })

  const { user, setUser, setDeposits, setWallets } = useUser()

  useEffect(() => {
    if (!firebaseUser && !userLoading) navigate('/')

    if (userLoading) return

    const fetchUserData = async () => {
      const userNickname = firebaseUser.displayName
      const userData = await userService.getUser(userNickname)

      const deposits = await depositService.processAndFetchDeposits(
        setDeposits,
        userNickname,
      )

      await walletsService.subscribeOnWallets(setWallets, userNickname)

      setUser({ ...userData, deposits })

      const userIP = await fetchUserIP()
      await userService.addIpToUser(userNickname, userIP.ip)
    }

    fetchUserData()
  }, [firebaseUser])

  useEffect(() => {
    if (!user) return

    setClosestDeposit(getClosestDeposit(user.deposits))

    const unsubscribe = transactionService.subscribeToLastTenTransactions(
      user.nickname,
      (updatedTransactions) => {
        setTransactions(updatedTransactions.map(transformTransaction))
      },
    )

    return () => unsubscribe()
  }, [user])

  if (!user || !transactions) return null

  return (
    <div className={styles['main-cabinet']}>
      <Wallets wallets={sortByAvailable(user.wallets)} />
      <Deposits deposits={user.deposits} />
      <div className={styles['accrual-wrapper']}>
        <NextAccrual lastAccrual={closestDeposit?.deposit.lastAccrual} />
        <LastTransactions transactions={transactions.slice(0, 4)} />
      </div>
    </div>
  )
}

export default MainCabinet
