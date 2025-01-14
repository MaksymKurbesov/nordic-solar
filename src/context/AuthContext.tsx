import { onAuthStateChanged, User } from 'firebase/auth'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { auth } from '@/main.tsx'

export const UserDataContext = createContext<{
  user: User | null
  isLoading: boolean
}>({
  user: null,
  isLoading: true,
})

export const useFirebaseUser = () => {
  const context = useContext(UserDataContext)
  if (!context) {
    throw new Error('useUserData must be used within a UserDataProvider')
  }
  return context
}

type Props = { children: ReactNode }
export const UserDataProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const authStateListener = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      setIsLoading(false)
      console.log('on auth state changed')
    })

    return () => {
      authStateListener()
    }
  }, [auth])

  return (
    <UserDataContext.Provider value={{ user, isLoading }}>
      {children}
    </UserDataContext.Provider>
  )
}
