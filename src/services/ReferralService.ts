import {
  Firestore,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  increment,
} from 'firebase/firestore'
import { REFERRAL_REWARDS_BY_LEVEL } from '@/utils/const.tsx'
import { transactionService } from '@/main.tsx'

interface IReferralService {
  db: Firestore
}

class ReferralService implements IReferralService {
  public readonly db: Firestore

  constructor(db: Firestore) {
    this.db = db
  }

  fetchReferralsData = async (username: string) => {
    try {
      const userDoc = await getDoc(doc(this.db, 'users', username))
      if (userDoc.exists()) {
        const userData = userDoc.data()
        console.log(userData, 'FETCH REFERRAL DATA')
        const referrals = userData?.referredTo || {} // Проверяем, есть ли у пользователя поле referral

        let referralData = {
          1: [],
          2: [],
          3: [],
          4: [],
        } // Объект для хранения данных рефералов

        // Итерируем по уровням рефералов
        const referralPromises = Object.keys(referrals).map(async (level) => {
          const referralIds = referrals[level]

          // Массив для хранения данных пользователей на текущем уровне
          referralData[level] = []

          console.log(referralIds, 'referralIds')

          // Получаем данные по каждому рефералу на данном уровне
          const userPromises = referralIds.map(async (referralPath) => {
            const referralDoc = await getDoc(referralPath)
            if (referralDoc.exists()) {
              const referralDetails = referralDoc.data()
              return referralDetails // Возвращаем данные о пользователе
            }
            return null // Если документ не найден, возвращаем null
          })

          // Ожидаем завершения всех запросов и сохраняем данные рефералов для текущего уровня
          referralData[level] = await Promise.all(userPromises)
        })

        await Promise.all(referralPromises)

        return referralData // Возвращаем данные всех рефералов
      } else {
        console.log('Документ пользователя не найден')
        return null
      }
    } catch (error) {
      console.error('Ошибка получения данных рефералов: ', error)
      return null
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
}

export default ReferralService
