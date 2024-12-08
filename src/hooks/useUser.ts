import { useContext } from 'react'
import { UserContext } from '@/UserContext.tsx'

export const useUser = () => {
  const { state, dispatch } = useContext(UserContext)

  const setUser = (user) => dispatch({ type: 'SET_USER', payload: user })

  const setDeposits = (deposits) =>
    dispatch({ type: 'SET_DEPOSITS', payload: deposits })

  const setWallets = (wallets) =>
    dispatch({ type: 'SET_WALLETS', payload: wallets })

  const setTransactions = (transactions) =>
    dispatch({ type: 'SET_TRANSACTIONS', payload: transactions })

  return { user: state.user, setUser, setDeposits, setWallets, setTransactions }
}
