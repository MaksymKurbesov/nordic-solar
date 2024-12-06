import { serverTimestamp, Timestamp } from 'firebase/firestore'
import AccrualTimer from '@/pages/Cabinet/MainCabinet/Deposits/AccrualTimer'
import { parseTimestamp } from '@/utils/helpers/date.tsx'

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
      solana: {
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
    variant: deposit.variant,
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

export const calculateTotalIncome = (initialAmount, dailyPercentage, days) => {
  if (isNaN(initialAmount)) {
    return 0
  }

  return +(((initialAmount * dailyPercentage) / 100) * days).toFixed(2)
}

export const calculateDailyIncome = (initialAmount, dailyRate) => {
  return ((initialAmount * dailyRate) / 100).toFixed(2)
}

export const getClosestDeposit = (deposits) => {
  if (!deposits) return

  const currentTime = new Date().getTime() / 1000

  return deposits.reduce((closest, deposit) => {
    if (!deposit.lastAccrual) return

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

export const logError = (message: string, error: unknown): void => {
  console.error(`[UserService] ${message}`, error)
}

export const fetchUserIP = async () => {
  try {
    // Получаем текущий IP-адрес пользователя
    const ipResponse = await fetch('https://api.ipify.org?format=json')
    const ipData = await ipResponse.json()
    const ip = ipData.ip

    // Получаем информацию о геолокации IP
    const locationResponse = await fetch(`http://ip-api.com/json/${ip}`)
    const locationData = await locationResponse.json()

    // Возвращаем IP-адрес и данные о геолокации
    return { ip, location: locationData }
  } catch (error) {
    console.error('Ошибка при получении IP-адреса:', error)
    throw error // Пробрасываем ошибку, чтобы её можно было обработать
  }
}

export const formatTimeLeft = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000)
  const days = Math.floor(totalSeconds / (60 * 60 * 24))
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60))
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60)
  const seconds = totalSeconds % 60

  return { days, hours, minutes, seconds }
}
