import styles from './CabinetLayout.module.scss'
import { Outlet } from 'react-router-dom'
import Footer from '@SharedUI/Footer/Footer.tsx'
import CabinetMenu from '@SharedUI/CabinetMenu/CabinetMenu.tsx'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import { db, depositService } from '@/main.tsx'

import axios from 'axios'
import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { useFirebaseUser } from '@/context/AuthContext.tsx'
import { useUser } from '@/hooks/useUser.ts'
import { transformTransaction } from '@/utils/helpers/transformData.tsx'

const CabinetLayout = () => {
  const { setUser, setDeposits, setWallets, setTransactions } = useUser()
  const { user: firebaseUser } = useFirebaseUser()

  useEffect(() => {
    if (!firebaseUser?.displayName) return

    const userNickname = firebaseUser.displayName
    const userRef = doc(db, 'users', userNickname)
    const transactionQuery = query(
      collection(db, 'transactions'),
      where('nickname', '==', userNickname),
      orderBy('date', 'desc'),
      limit(10),
    )

    const unsubscribeUser = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        setWallets(doc.data().wallets || [])
      }
    })

    const unsubscribeTransactions = onSnapshot(
      transactionQuery,
      (querySnapshot) => {
        const transactions = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        const transformedTransactions = transactions.map(transformTransaction)
        console.log(transformedTransactions, 'transformedTransactions')
        setTransactions(transformedTransactions)
      },
    )

    const fetchUserData = async () => {
      try {
        const [userResponse] = await Promise.all([
          axios.post('http://localhost:3000/user/get-user', {
            username: userNickname,
          }),
          axios.post('https://apate-backend.com/nordic-solar/ip', {
            username: userNickname,
          }),
        ])

        setUser(userResponse.data)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUserData()

    depositService.processAndFetchDeposits(setDeposits, userNickname)

    // Cleanup on unmount
    return () => {
      unsubscribeUser()
      unsubscribeTransactions()
    }
  }, [firebaseUser, setUser, setDeposits, setWallets, setTransactions])

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
