import { serverTimestamp } from 'firebase/firestore'

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
      isCheaterInReferral: false,
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

export const getActiveRestriction = (restrictions) => {
  for (let key in restrictions) {
    if (
      typeof restrictions[key] === 'boolean' &&
      restrictions[key] &&
      key !== 'isPrivateKey'
    ) {
      return key
    }

    if (
      typeof restrictions[key] === 'object' &&
      restrictions[key].isActive
      // key !== "isMoneyLaundering"
    ) {
      console.log('this if ')
      return key
    }
  }
  return null
}

export const hasActiveRestrictions = (restrictions) => {
  if (!restrictions) return

  return Object.keys(restrictions).some((key) => {
    if (typeof restrictions[key] === 'boolean' && key !== 'isPrivateKey') {
      return restrictions[key]
    }
    if (
      typeof restrictions[key] === 'object' &&
      restrictions[key].isActive !== undefined &&
      key !== 'isMoneyLaundering'
    ) {
      return restrictions[key].isActive
    }
    return false
  })
}
