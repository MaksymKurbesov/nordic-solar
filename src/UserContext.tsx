import { createContext, useState, ReactNode, useEffect, FC } from 'react'
import { auth, walletsService } from '@/main.tsx'

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
export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [wallets, setWallets] = useState([])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Действия при наличии пользователя
        walletsService.subscribeOnWallets(user.displayName, setWallets)
      } else {
        setWallets([])
      }
    })

    return () => unsubscribe()
  }, [])

  // Объект значений, который будет предоставлен всем компонентам
  const value = {
    user,
    setUser,
    wallets,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
