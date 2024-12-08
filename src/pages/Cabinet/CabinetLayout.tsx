import styles from './CabinetLayout.module.scss'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '@SharedUI/Footer/Footer.tsx'
import CabinetMenu from '@SharedUI/CabinetMenu/CabinetMenu.tsx'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import {
  auth,
  depositService,
  transactionService,
  userService,
  walletsService,
} from '@/main.tsx'
import { fetchUserIP } from '@/utils/helpers.tsx'
import { useUser } from '@/hooks/useUser.ts'
import { useAuthState } from '@/hooks/useAuthState.ts'

const CabinetLayout = () => {
  const { setUser, setDeposits, setWallets, setTransactions } = useUser()

  const navigate = useNavigate()
  const [firebaseUser, userLoading] = useAuthState(auth, {
    onUserChanged: true,
  })

  useEffect(() => {
    if (!firebaseUser && !userLoading) navigate('/')

    if (userLoading) return

    const fetchUserData = async () => {
      const userNickname = firebaseUser.displayName
      const userData = await userService.getUser(userNickname)

      await depositService.processAndFetchDeposits(setDeposits, userNickname)
      await walletsService.subscribeOnWallets(setWallets, userNickname)
      await transactionService.subscribeToTransactions(
        setTransactions,
        userNickname,
      )

      setUser(userData)

      const userIP = await fetchUserIP()
      await userService.addIpToUser(userNickname, userIP.ip)
    }

    fetchUserData()
  }, [firebaseUser])

  return (
    <div className={styles['cabinet']}>
      <CabinetMenu />
      <div className={'container'}>
        <Outlet />
      </div>
      <Footer />
      {/*<MobileCabinetMenu />*/}
      <Toaster />
    </div>
  )
}

export default CabinetLayout
