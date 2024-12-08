import { createContext, ReactNode, FC, useReducer, Dispatch } from 'react'

interface User {
  id: string
  name: string
  email: string
  wallets?: any
  earned: number
  invested: number
  withdrawn: number
  referrals: number
  nickname: string
  registrationDate: any
  deposits?: []
  transactions?: []
}

export interface UserState {
  user: User | null
}

type Action =
  | { type: 'SET_USER'; payload: any }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'SET_DEPOSITS'; payload: any }
  | { type: 'SET_WALLETS'; payload: any }
  | { type: 'SET_TRANSACTIONS'; payload: any }

const initialState = {
  user: null,
}

const reducer = (state: UserState, action: Action): UserState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }
    case 'SET_DEPOSITS':
      return { ...state, user: { ...state.user, deposits: action.payload } }
    case 'SET_WALLETS':
      return { ...state, user: { ...state.user, wallets: action.payload } }
    case 'SET_TRANSACTIONS':
      return { ...state, user: { ...state.user, transactions: action.payload } }
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
