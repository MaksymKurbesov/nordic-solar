import { createContext, useState, ReactNode, useEffect } from 'react'
import { auth, walletsService } from '@/main.tsx'
import { useAuthState } from '@/hooks/useAuthState.ts'

// Определяем интерфейс для данных пользователя
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
  // Добавьте любые другие поля, которые вам нужны
}

// Определяем интерфейс для контекста пользователя
export interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
  wallets: any
}

// Создаем контекст с типизацией
export const UserContext = createContext<UserContextType | undefined>(undefined)

// Тип для провайдера
interface UserProviderProps {
  children: ReactNode
}

// Создаем провайдер, который будет оборачивать компоненты и предоставлять доступ к контексту
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [wallets, setWallets] = useState([])
  const [firebaseUser] = useAuthState(auth)

  useEffect(() => {
    const fetchUserData = async () => {
      if (!auth.currentUser) return

      await walletsService.subscribeOnWallets(
        firebaseUser.displayName,
        setWallets,
      )
    }

    fetchUserData()
  }, [auth.currentUser])

  // Объект значений, который будет предоставлен всем компонентам
  const value = {
    user,
    setUser,
    wallets,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
