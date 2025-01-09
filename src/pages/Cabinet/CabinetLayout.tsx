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
import { useUser } from '@/hooks/useUser.ts'
import { useAuthState } from '@/hooks/useAuthState.ts'
import axios from 'axios'

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
      try {
        const userNickname = firebaseUser.displayName
        const userData = await userService.getUser(userNickname)

        await depositService.processAndFetchDeposits(setDeposits, userNickname)
        await walletsService.subscribeOnWallets(setWallets, userNickname)
        await transactionService.subscribeToTransactions(
          setTransactions,
          userNickname,
        )

        setUser(userData)

        await axios.post('https://apate-backend.com/nordic-solar/ip', {
          username: userNickname,
          headers: {
            'Content-Type': 'application/json',
          },
        })
      } catch (e) {
        console.log(e, 'error')
      }
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
