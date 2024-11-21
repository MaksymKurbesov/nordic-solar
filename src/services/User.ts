import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  Firestore,
  getDoc,
  CollectionReference,
  increment,
  arrayUnion,
} from 'firebase/firestore'
import { generateUserData } from '@/utils/helpers.tsx'
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  User,
} from 'firebase/auth'
import { auth } from '@/main.tsx'

interface IUserService {
  db: Firestore
  userCollection: CollectionReference<any>
}

class UserService implements IUserService {
  public readonly db: Firestore
  public readonly userCollection: CollectionReference<any>

  constructor(db: Firestore) {
    this.db = db
    this.userCollection = collection(db, 'users') as CollectionReference<any>
  }

  // async addUser(user: IUser): Promise<void> {
  async registerUser(
    nickname: string,
    email: string,
    password: string,
  ): Promise<void> {
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password)

      await updateProfile(auth.currentUser as User, {
        displayName: nickname,
      }).catch((err) => console.log(err))

      const user = generateUserData(nickname, email)
      const userRef = doc(this.userCollection, nickname)
      await setDoc(userRef, user)

      console.log('UserService added successfully')
    } catch (error) {
      console.error('Error adding user: ', error)
    }
  }

  async addReferralToUser(username: string, referralName: string) {
    const referralRef = doc(this.userCollection, referralName)
    const usernameRef = doc(this.userCollection, username)

    await updateDoc(referralRef, {
      [`referral.1`]: arrayUnion(usernameRef),
    })

    await updateDoc(usernameRef, {
      referredBy: referralName,
    })
  }

  async logIn(email: string, password: string, setError) {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      setError('')
    } catch (error) {
      console.log(error.code, 'error.code')

      if (error.code === 'auth/invalid-credential') {
        setError('Неправильный пароль. Пожалуйста, попробуйте снова.')
      } else if (error.code === 'auth/invalid-email') {
        setError('Пользователь не найден.')
      } else if (error.code === 'auth/too-many-requests') {
        setError('Слишком частые запросы. Попробуйте попозже.')
      }
    }
  }

  async logout() {
    await signOut(auth)
  }

  async getUser(nickname: string) {
    try {
      const userDocRef = doc(this.userCollection, nickname) // Предположим, что у вас есть коллекция 'users'
      const userDoc = await getDoc(userDocRef)

      if (userDoc.exists()) {
        return userDoc.data() // Возвращаем данные пользователя
      } else {
        console.log('No such document!')
        return null
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
      return null
    }
  }

  // async updateUser(userId: string, updatedData: Partial<IUser>): Promise<void> {
  async updateUser(userID: string, updatedData: Partial<any>): Promise<void> {
    try {
      const userRef = doc(this.userCollection, userID)
      await updateDoc(userRef, updatedData)
      console.log('UserService updated successfully')
    } catch (error) {
      console.error('Error updating user: ', error)
    }
  }

  async incrementUserBalance(userID: string, wallet: string, amount: number) {
    try {
      const userRef = doc(this.userCollection, userID)
      await updateDoc(userRef, {
        [`wallets.${wallet}.available`]: increment(amount),
      })
      console.log('Balance updated!')
    } catch (error) {
      console.error('Error updating balance: ', error)
    }
  }

  async updateUserAfterOpenPlan(
    userID: string,
    wallet: string,
    amount: number,
  ) {
    try {
      const userRef = doc(this.userCollection, userID)
      await updateDoc(userRef, {
        [`wallets.${wallet}.available`]: increment(-amount),
        invested: increment(amount),
      })
      console.log('Balance updated!')
    } catch (error) {
      console.error('Error updating balance: ', error)
    }
  }

  async deleteUser(userId: string): Promise<void> {
    try {
      const userRef = doc(this.userCollection, userId)
      await deleteDoc(userRef)
      console.log('UserService deleted successfully')
    } catch (error) {
      console.error('Error deleting user: ', error)
    }
  }
}

export default UserService
