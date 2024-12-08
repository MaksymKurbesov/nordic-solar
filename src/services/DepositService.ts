import {
  collection,
  CollectionReference,
  doc,
  Firestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  runTransaction,
  increment,
} from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import { transactionService, userService } from '@/main'
import { PLAN_VARIANT } from '@/utils/const.tsx'
import { addDays, daysPassedSince } from '@/utils/helpers/date.tsx'
import { transformDeposit } from '@/utils/helpers/transformData.tsx'

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
      closeDate: Timestamp.fromMillis(Date.now() + days * 24 * 60 * 60 * 1000),
      received: 0,
      lastAccrual: serverTimestamp(),
      willReceived,
      charges: 0,
      isActive: true,
      plan,
    })
  }

  async processAndFetchDeposits(setDeposits, nickname: string) {
    try {
      const allDepositsQuery = query(
        collection(this.db, 'users', nickname, 'deposits'),
        orderBy('openDate', 'desc'),
      )

      // Подписываемся на изменения с помощью onSnapshot
      onSnapshot(allDepositsQuery, async (snapshot) => {
        const results = await Promise.all(
          snapshot.docs.map(async (item) => {
            const depositData = item.data()

            if (!depositData.isActive) {
              return depositData
            }

            const depositWithOneAccrual = depositData.planNumber > 3

            if (depositWithOneAccrual) {
              await this.makeAccrual(item.ref, nickname)
            } else {
              await this.makeAccruals(item.ref, nickname)
            }

            return { ...depositData }
          }),
        )

        const transformedDeposits = results.map(transformDeposit)

        setDeposits(transformedDeposits)
      })
    } catch (e) {
      console.error(e)
      alert(`${e} processAndFetchDeposits`)
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
          transaction.update(depositRef, {
            charges: 1,
            received: willReceived,
            isActive: false,
          })

          transaction.update(userDoc, {
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

        if (!deposit.exists()) return

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

        transaction.update(depositRef, {
          charges: isLastCharge ? days : increment(daysWithoutAccruals),
          lastAccrual: updatedTime,
          received: isLastCharge
            ? increment(receivedByOneCharge * (days - charges))
            : increment(receivedByOneCharge * daysWithoutAccruals),
          isActive: !isLastCharge,
        })

        transaction.update(userDoc, {
          earned: increment(receivedByOneCharge * daysWithoutAccruals),
          [`wallets.${wallet}.available`]: isLastCharge
            ? increment(receivedByOneCharge * (days - charges))
            : increment(receivedByOneCharge * daysWithoutAccruals),
        })

        if (isActive && isLastCharge) {
          transaction.update(userDoc, {
            [`wallets.${wallet}.available`]: increment(amount),
          })
        }
      })
    } catch (e) {
      console.error(e)
      alert(`${e} makeAccruals`)
    }
  }
}

export default DepositService
