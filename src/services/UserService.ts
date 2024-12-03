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
import { auth, transactionService } from '@/main.tsx'
import { REFERRAL_REWARDS_BY_LEVEL } from '@/utils/const.tsx'

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

  addReferralRewards = async (
    nickname: string,
    amount: number,
    executor: string,
  ) => {
    const referralLength = 4

    try {
      let currentReferralLevel = 1

      const addReward = async (
        referredBy: string,
        amount: number,
        wallet: string,
      ) => {
        const referredByDoc = doc(this.db, 'users', referredBy)
        const referredBySnap = await getDoc(referredByDoc)
        const referralNotFound = referredBy === '' || !referredBySnap.exists()

        if (currentReferralLevel > referralLength || referralNotFound) {
          return
        }

        const referralReward =
          (amount / 100) * REFERRAL_REWARDS_BY_LEVEL[currentReferralLevel]

        await updateDoc(referredByDoc, {
          referrals: increment(referralReward),
          [`wallets.${wallet}.referrals`]: increment(referralReward),
          [`wallets.${wallet}.available`]: increment(referralReward),
        })

        await transactionService.addTransaction({
          amount: referralReward,
          executor: nickname,
          nickname: referredBySnap.data().nickname,
          status: 'Выполнено',
          type: 'Реферальные',
        })

        currentReferralLevel++

        await addReward(referredBySnap.data().referredBy, amount, wallet)
      }

      const userRef = doc(this.db, 'users', nickname)

      await getDoc(userRef).then(async (user) => {
        if (!user.exists()) return

        await addReward(user.data().referredBy, amount, executor)
      })
    } catch (e) {
      console.error(e)
    }
  }

  addReferralToAllLevels = async (referredBy: string, signedUpUser: string) => {
    if (referredBy === '') {
      return
    }

    try {
      let currentReferralLevel = 1

      const signedUpUserDoc = doc(this.db, 'users', signedUpUser)
      await updateDoc(signedUpUserDoc, {
        referredBy,
      })

      const addReferral = async (referredBy: string) => {
        const referredByDoc = doc(this.db, 'users', referredBy)
        const nextReferredBy = await getDoc(referredByDoc)

        const referralLength = 4

        if (currentReferralLevel > referralLength || referredBy === '') {
          return
        }

        if (!nextReferredBy.exists()) {
          return
        }

        await updateDoc(referredByDoc, {
          [`referredTo.${currentReferralLevel}`]: arrayUnion(signedUpUserDoc),
        })

        currentReferralLevel++

        await addReferral(nextReferredBy.data().referredBy)
      }

      await addReferral(referredBy)
    } catch (e) {
      console.error(e)
    }
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
