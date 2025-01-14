import { useContext } from 'react'
import { UserContext } from '@/UserContext.tsx'
import {
  IDeposit,
  ITransaction,
  ITransformedTransaction,
  IUser,
  IWallets,
} from '@/interfaces/IUser.ts'

export const useUser = () => {
  const { state, dispatch } = useContext(UserContext)

  const setUser = (user: IUser) => dispatch({ type: 'SET_USER', payload: user })

  const setDeposits = (deposits: IDeposit[]) =>
    dispatch({ type: 'SET_DEPOSITS', payload: deposits })

  const setWallets = (wallets: IWallets) =>
    dispatch({ type: 'SET_WALLETS', payload: wallets })

  const setTransactions = (
    transactions: ITransaction[] | ITransformedTransaction[],
  ) => dispatch({ type: 'SET_TRANSACTIONS', payload: transactions })

  return { user: state.user, setUser, setDeposits, setWallets, setTransactions }
}
