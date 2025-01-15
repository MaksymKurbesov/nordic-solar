import { useContext, useEffect } from 'react'
import { UserContext } from '@/UserContext.tsx'
import {
  IDeposit,
  ITransaction,
  ITransformedTransaction,
  IUser,
} from '@/interfaces/IUser.ts'
import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { db } from '@/main.tsx'
import { transformTransaction } from '@/utils/helpers/transformData.tsx'

export const useUser = (userId?: string) => {
  const { state, dispatch } = useContext(UserContext)

  useEffect(() => {
    if (!userId) return

    const userQuery = doc(db, 'users', userId)
    const transactionQuery = query(
      collection(db, 'transactions'),
      where('nickname', '==', userId),
      orderBy('date', 'desc'),
      limit(10),
    )

    const unsubscribeUser = onSnapshot(userQuery, (doc) => {
      if (doc.exists()) {
        const userData = doc.data() as IUser

        dispatch({ type: 'SET_USER', payload: userData })
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
        dispatch({ type: 'SET_TRANSACTIONS', payload: transformedTransactions })
      },
    )

    return () => {
      unsubscribeUser()
      unsubscribeTransactions()
    }
  }, [userId])

  const setDeposits = (deposits: IDeposit[]) =>
    dispatch({ type: 'SET_DEPOSITS', payload: deposits })

  return { user: state.user, setDeposits }
}
