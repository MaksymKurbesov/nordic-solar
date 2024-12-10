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
  query,
  where,
  onSnapshot,
} from 'firebase/firestore'
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage'
import { generateUserData, logError } from '@/utils/helpers.tsx'
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  User,
} from 'firebase/auth'
import { auth, storage } from '@/main.tsx'

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
    } catch (error) {
      logError('Error adding user: ', error)
    }
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
      logError('Error fetching user data: ', error)
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
      logError('Error updating user ', error)
    }
  }

  async updateUserAvatar(avatar, setUserAvatar) {
    try {
      if (!auth.currentUser) return

      const userAvatarRef = ref(
        storage,
        `userAvatars/${auth.currentUser.displayName}`,
      )

      await uploadBytesResumable(userAvatarRef, avatar)
        .then((data) => console.log(data, 'data'))
        .catch((e) => console.log(e, 'errrrrrooooooor'))

      const photoURL = await getDownloadURL(userAvatarRef)

      await updateProfile(auth.currentUser, {
        photoURL,
      })

      setUserAvatar(photoURL)
    } catch (e) {
      alert(e)
      console.error(e)
    }
  }

  async addIpToUser(nickname: string, ip: string) {
    try {
      const userRef = doc(this.userCollection, nickname)
      const userSnap = await getDoc(userRef)

      if (userSnap.exists()) {
        const userData = userSnap.data()

        // Проверяем, есть ли поле ip и является ли оно массивом
        if (Array.isArray(userData.ip)) {
          if (userData.ip.includes(ip)) {
            console.log('Этот IP уже существует в массиве.')
            return
          }

          console.log(ip, 'ipppppppppppp')

          // Добавляем новый IP в массив
          await updateDoc(userRef, {
            ip: arrayUnion(ip),
          })

          console.log('IP успешно добавлен.')
        } else {
          // Если поле ip не массив, создаём его и добавляем IP
          await updateDoc(userRef, {
            ip: [ip],
          })

          console.log('Поле ip создано и IP добавлен.')
        }
      } else {
        console.log('Пользователь и поле ip созданы, IP добавлен.')
      }
    } catch (error) {
      logError('Error adding ip to user ', error)
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

  async logIn(email: string, password: string, setError) {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      setError('')
    } catch (error) {
      logError('logIn: ', error)

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
}

export default UserService
