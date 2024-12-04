import styles from './CabinetLayout.module.scss'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '@SharedUI/Footer/Footer.tsx'
import CabinetMenu from '@SharedUI/CabinetMenu/CabinetMenu.tsx'
import { useEffect } from 'react'
import { useAuthState } from '@/hooks/useAuthState.ts'
import { auth, depositService, userService, walletsService } from '@/main.tsx'
import MobileCabinetMenu from '@SharedUI/CabinetMenu/MobileCabinetMenu'
import { Toaster } from 'react-hot-toast'
import { useUser } from '@/hooks/useUser.ts'

const CabinetLayout = () => {
  const navigate = useNavigate()

  const [firebaseUser, userLoading] = useAuthState(auth, {
    onUserChanged: true,
  })

  const { user, setUser, setDeposits, setWallets } = useUser()

  useEffect(() => {
    if (userLoading) return

    const fetchUserData = async () => {
      const userNickname = firebaseUser.displayName
      const userData = await userService.getUser(userNickname)
      await depositService.getAllDeposits(setDeposits, userNickname)
      await walletsService.subscribeOnWallets(setWallets, userNickname)
      setUser(userData)
    }

    fetchUserData()
  }, [firebaseUser])

  useEffect(() => {
    if (!firebaseUser && !userLoading) navigate('/')

    if (!firebaseUser) return

    const checkDeposits = async () => {
      return await depositService.checkDepositsForAccruals(
        firebaseUser.displayName,
      )
    }

    checkDeposits()
  }, [firebaseUser])

  return (
    <div className={styles['cabinet']}>
      <CabinetMenu />
      <div className={'container'}>
        <Outlet />
      </div>
      <Footer />
      <MobileCabinetMenu />
      <Toaster />
    </div>
  )
}

export default CabinetLayout
