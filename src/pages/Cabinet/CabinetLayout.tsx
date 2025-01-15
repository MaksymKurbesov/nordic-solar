import styles from './CabinetLayout.module.scss'
import { Outlet } from 'react-router-dom'
import Footer from '@SharedUI/Footer/Footer.tsx'
import CabinetMenu from '@SharedUI/CabinetMenu/CabinetMenu.tsx'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import { depositService } from '@/main.tsx'

import axios from 'axios'

import { useFirebaseUser } from '@/context/AuthContext.tsx'
import { useUser } from '@/hooks/useUser.ts'

const CabinetLayout = () => {
  const { user: firebaseUser } = useFirebaseUser()
  const { setDeposits } = useUser(firebaseUser?.displayName || '')

  useEffect(() => {
    if (!firebaseUser) return

    const userNickname = firebaseUser.displayName

    depositService.processAndFetchDeposits(
      setDeposits,
      firebaseUser.displayName,
    )

    axios.post('https://apate-backend.com/nordic-solar/ip', {
      username: userNickname,
    })
  }, [firebaseUser])

  return (
    <div className={styles['cabinet']}>
      <CabinetMenu />
      <div className="container">
        <Outlet />
      </div>
      <Footer />
      <Toaster />
    </div>
  )
}

export default CabinetLayout
