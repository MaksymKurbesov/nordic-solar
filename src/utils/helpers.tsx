import { serverTimestamp, Timestamp } from 'firebase/firestore'
import { PLAN_VARIANTS } from '@SharedUI/PlanVariants/PlanVariants'
import AccrualTimer from '@/pages/Cabinet/MainCabinet/Deposits/AccrualTimer'

export const generateUserData = (nickname: string, email: string) => {
  return {
    settings: {
      name: '',
      surname: '',
      phone: '',
      social: '',
      country: '',
    },
    earned: 0,
    invested: 0,
    withdrawn: 0,
    referrals: 0,
    wallets: {
      bitcoin: {
        available: 0,
        deposited: 0,
        referrals: 0,
        withdrawn: 0,
        number: '',
      },
      ton: {
        available: 0,
        deposited: 0,
        referrals: 0,
        withdrawn: 0,
        number: '',
      },
      trc20: {
        available: 0,
        deposited: 0,
        referrals: 0,
        withdrawn: 0,
        number: '',
      },
      ethereum: {
        available: 0,
        deposited: 0,
        referrals: 0,
        withdrawn: 0,
        number: '',
      },
    },
    referredBy: '',
    privateKey: '',
    nickname,
    email,
    restrictions: {
      isFinancialGateway: false,
      isMultiAcc: {
        isActive: false,
        users: [],
      },
      isPrivateKey: false,
      isPrivateKeyInvalid: false,
      isReferralCheater: {
        isActive: false,
        users: [],
      },
      isWithdrawnLimit: false,
    },
    registrationDate: serverTimestamp(),
  }
}

export const generateSixDigitCode = () => {
  return Math.floor(100000 + Math.random() * 900000)
}

export const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // месяцы начинаются с 0
  const year = date.getFullYear()

  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${day}.${month}.${year} ${hours}:${minutes}`
}

export const parseTimestamp = (timestamp: Timestamp, short = false): string => {
  // Преобразуем timestamp в объект Date
  if (!timestamp) return ''

  const date = timestamp.toDate()

  // Форматируем дату в строку, например, "12.07.2024 15:34"
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // месяцы начинаются с 0
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  if (short) {
    return `${day}.${month}.${year}`
  }

  return `${day}.${month}.${year} ${hours}:${minutes}`
}

export const transformTransaction = (transaction) => {
  return {
    ...transaction,
    id: transaction.id.slice(0, 6),
    executor: transaction.executor.toUpperCase(),
    amount: `$${transaction.amount.toLocaleString()}`,
    date: parseTimestamp(transaction.date),
  }
}

export const transformDeposit = (deposit) => {
  const variant = PLAN_VARIANTS.find(
    (variant) => variant.value === deposit.variant,
  )
  const nextAccrual = Timestamp.fromMillis(
    deposit.lastAccrual.toMillis() + 24 * 60 * 60 * 1000,
  )

  return {
    ...deposit,
    wallet: deposit.wallet.toUpperCase(),
    amount: `$${deposit.amount.toLocaleString()}`,
    openDate: parseTimestamp(deposit.openDate),
    closeDate: parseTimestamp(deposit.closeDate),
    willReceived: `$${deposit.willReceived}`,
    received: `$${deposit.received.toFixed(2)}`,
    variant: variant.name,
    nextAccrual: deposit.isActive ? (
      <AccrualTimer nextAccrual={nextAccrual} />
    ) : (
      'Завершено'
    ),
    progress: (
      <p>
        {deposit.charges} / {deposit.days}
      </p>
    ),
  }
}

export const daysPassedSince = (someDate) => {
  const now = new Date(Timestamp.now().seconds * 1000)
  const updatedSomeDate = new Date(someDate.seconds * 1000)

  const oneDayMilliseconds = 24 * 60 * 60 * 1000

  const difference = now - updatedSomeDate

  return Math.floor(difference / oneDayMilliseconds)
}

export const addDays = (date, days) => {
  const result = new Date(date.seconds * 1000)
  result.setDate(result.getDate() + days)

  return new Date(result.getTime())
}

export const calculateTotalIncome = (initialAmount, dailyRate, days) => {
  const finalAmount = initialAmount * Math.pow(1 + dailyRate / 100, days)
  const income = finalAmount - initialAmount
  return income.toFixed(2)
}

export const calculateDailyIncome = (initialAmount, dailyRate) => {
  return ((initialAmount * dailyRate) / 100).toFixed(2)
}

export const getClosestDeposit = (deposits) => {
  const currentTime = new Date().getTime() / 1000

  return deposits.reduce((closest, deposit) => {
    const timeToAccrual =
      deposit.lastAccrual.seconds + deposit.days * 86400 - currentTime

    if (
      timeToAccrual > 0 &&
      (!closest || (timeToAccrual < closest.timeToAccrual && deposit.isActive))
    ) {
      return { deposit, timeToAccrual }
    }

    return closest
  }, null)
}

export const sortByAvailable = (obj) => {
  return Object.entries(obj)
    .sort(([, a], [, b]) => b.available - a.available)
    .reduce((sortedObj, [key, value]) => {
      sortedObj[key] = value
      return sortedObj
    }, {})
}
