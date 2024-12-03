import { Firestore, doc, getDoc } from 'firebase/firestore'

interface IReferralService {
  db: Firestore
}

class ReferralService implements IReferralService {
  public readonly db: Firestore

  constructor(db: Firestore) {
    this.db = db
  }

  fetchReferralsData = async (username) => {
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
}

export default ReferralService
