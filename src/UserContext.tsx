import { createContext, ReactNode, FC, useReducer, Dispatch } from 'react'
import {
  IDeposit,
  IExtendedUser,
  ITransaction,
  ITransformedTransaction,
  IUser,
} from '@/interfaces/IUser.ts'
import { IWallets } from '@/interfaces/IWallets.ts'

interface UserState {
  user: IExtendedUser | null
}

type Action =
  | { type: 'SET_USER'; payload: IUser }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'SET_DEPOSITS'; payload: IDeposit[] }
  | { type: 'SET_WALLETS'; payload: IWallets }
  | {
      type: 'SET_TRANSACTIONS'
      payload: ITransaction[] | ITransformedTransaction[]
    }

const initialState: UserState = {
  user: null,
}

const reducer = (state: UserState, action: Action): UserState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }
    case 'SET_DEPOSITS':
      if (state.user) {
        return {
          ...state,
          user: {
            ...state.user,
            deposits: action.payload,
          },
        }
      }
      return state
    case 'SET_WALLETS':
      if (state.user) {
        return {
          ...state,
          user: {
            ...state.user,
            wallets: action.payload,
          },
        }
      }
      return state
    case 'SET_TRANSACTIONS':
      if (state.user) {
        return {
          ...state,
          user: {
            ...state.user,
            transactions: action.payload,
          },
        }
      }
      return state
    default:
      return state
  }
}

interface UserContextProps {
  state: UserState
  dispatch: Dispatch<Action>
}

export const UserContext = createContext<UserContextProps>({
  state: initialState,
  dispatch: () => null,
})

interface UserProviderProps {
  children: ReactNode
}

// Создаем провайдер, который будет оборачивать компоненты и предоставлять доступ к контексту
export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}
