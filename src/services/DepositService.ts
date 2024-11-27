import {
  collection,
  CollectionReference,
  doc,
  Firestore,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  runTransaction,
  increment,
} from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import { addDays, daysPassedSince } from '@/utils/helpers'
import { transactionService, userService } from '@/main'
import { PLAN_VARIANT } from '@/utils/const.tsx'

interface IDepositService {
  db: Firestore
  depositCollection: CollectionReference<any>
}

class DepositService implements IDepositService {
  public readonly db: Firestore
  public readonly depositCollection: CollectionReference<any>

  constructor(db: Firestore) {
    this.db = db
    this.depositCollection = collection(db, 'users') as CollectionReference<any>
  }

  async openPlan(nickname: string, deposit: any) {
    const { amount, days, wallet, variant, willReceived, plan } = deposit
    const id = uuidv4()

    await userService.updateUserAfterOpenPlan(nickname, wallet, amount)

    const depositDoc = doc(
      this.db,
      'users',
      nickname,
      'deposits',
      `${deposit.amount}-${id}`,
    )

    await transactionService.addTransaction({
      amount,
      executor: wallet,
      id,
      type: 'Депозит',
      nickname: nickname,
      status: 'Выполнено',
    })

    await setDoc(depositDoc, {
      amount,
      days,
      wallet,
      variant,
      openDate: serverTimestamp(),
      closeDate: Timestamp.fromMillis(Date.now() + 10 * 24 * 60 * 60 * 1000),
      received: 0,
      lastAccrual: serverTimestamp(),
      willReceived,
      charges: 0,
      isActive: true,
      plan,
    })
  }

  getAllDeposits(setUserDeposits, nickname) {
    try {
      const depositsCollection = query(
        collection(this.db, 'users', nickname, 'deposits'),
        orderBy('openDate', 'desc'),
      )

      return onSnapshot(depositsCollection, (depositSnap) => {
        setUserDeposits(
          depositSnap.docs.map((deposit) => {
            return deposit.data()
          }),
        )
      })
    } catch (e) {
      console.error(e)
      alert(`${e} getAllDeposits`)
    }
  }

  async makeAccrual(depositRef, nickname) {
    const userDoc = doc(this.db, 'users', nickname)

    try {
      await runTransaction(this.db, async (transaction) => {
        const deposit = await transaction.get(depositRef)

        const { amount, lastAccrual, wallet, days, willReceived } =
          deposit.data()

        const daysWithoutAccruals = daysPassedSince(lastAccrual)
        const isDepositFinished = daysWithoutAccruals >= days

        if (isDepositFinished) {
          await transaction.update(depositRef, {
            charges: 1,
            received: willReceived,
            isActive: false,
          })

          await transaction.update(userDoc, {
            earned: willReceived,
            [`wallets.${wallet}.available`]: increment(willReceived + amount),
          })

          await transactionService.addTransaction({
            amount: willReceived,
            executor: wallet,
            id: uuidv4(),
            type: 'Начисление',
            nickname: nickname,
            status: 'Выполнено',
          })
        }
      })
    } catch (e) {
      console.error(e)
      alert(`${e} makeAccrual`)
    }
  }

  async makeAccruals(depositRef, nickname) {
    const userDoc = doc(this.db, 'users', nickname)

    try {
      await runTransaction(this.db, async (transaction) => {
        const deposit = await transaction.get(depositRef)

        const {
          amount,
          lastAccrual,
          variant,
          wallet,
          charges,
          days,
          isActive,
          plan,
        } = deposit.data()

        // const planVariant = PLAN_VARIANT.find((item) => item.value === variant)
        const percentageInDay = PLAN_VARIANT[plan][variant].inDay
        const daysWithoutAccruals = daysPassedSince(lastAccrual)
        const isLastCharge = daysWithoutAccruals + charges >= days
        const updatedTime = addDays(lastAccrual, daysWithoutAccruals)
        const receivedByOneCharge = (amount * percentageInDay) / 100

        for (let i = 0; i < daysWithoutAccruals; i++) {
          await transactionService.addTransaction({
            amount: receivedByOneCharge,
            executor: wallet,
            id: uuidv4(),
            type: 'Начисление',
            nickname: nickname,
            status: 'Выполнено',
            date: addDays(lastAccrual, i + 1),
          })
        }

        await transaction.update(depositRef, {
          charges: isLastCharge ? days : increment(daysWithoutAccruals),
          lastAccrual: updatedTime,
          received: isLastCharge
            ? increment(receivedByOneCharge * (days - charges))
            : increment(receivedByOneCharge * daysWithoutAccruals),
          isActive: !isLastCharge,
        })

        await transaction.update(userDoc, {
          earned: increment(receivedByOneCharge * daysWithoutAccruals),
          [`wallets.${wallet}.available`]: isLastCharge
            ? increment(receivedByOneCharge * (days - charges))
            : increment(receivedByOneCharge * daysWithoutAccruals),
        })

        if (isActive && isLastCharge) {
          await transaction.update(userDoc, {
            [`wallets.${wallet}.available`]: increment(amount),
          })
        }
      })
    } catch (e) {
      console.error(e)
      alert(`${e} makeAccruals`)
    }
  }

  async checkDepositsForAccruals(nickname) {
    const allDepositsQuery = query(
      collection(this.db, 'users', nickname, 'deposits'),
    )

    try {
      await getDocs(allDepositsQuery).then((snap) => {
        snap.docs.forEach(async (item) => {
          if (!item.data().isActive) {
            return
          }

          const depositWithOneAccrual = item.data().planNumber > 3

          if (depositWithOneAccrual) {
            console.log('one accrual')
            await this.makeAccrual(item.ref, nickname)
          } else {
            console.log('many accrual')
            await this.makeAccruals(item.ref, nickname)
          }
        })
      })
    } catch (e) {
      console.error(e)
      alert(`${e} checkDepositsForAccruals`)
    }
  }
}

export default DepositService
