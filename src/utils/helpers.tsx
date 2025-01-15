import { IDeposit, IRestrictions, IWallets } from '@/interfaces/IUser.ts'

export const generateSixDigitCode = () => {
  return Math.floor(100000 + Math.random() * 900000)
}

export const calculateTotalIncome = (
  initialAmount: number,
  dailyPercentage: number | null,
  days: number | null,
) => {
  if (isNaN(initialAmount)) {
    return 0
  }

  if (!dailyPercentage || !days) {
    return 0
  }

  return +(((initialAmount * dailyPercentage) / 100) * days).toFixed(2)
}

export const calculateDailyIncome = (
  initialAmount: number,
  dailyRate: number,
) => {
  return ((initialAmount * dailyRate) / 100).toFixed(2)
}

export const getClosestDeposit = (
  deposits: IDeposit[],
): { deposit: IDeposit; timeToAccrual: number } | null => {
  if (!deposits || deposits.length === 0) return null

  const currentTime = new Date().getTime() / 1000

  return deposits.reduce<{
    deposit: IDeposit
    timeToAccrual: number
  } | null>((closest, deposit) => {
    if (!deposit.lastAccrual) return closest

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

export const sortByAvailable = (wallets: IWallets): IWallets => {
  return Object.entries(wallets)
    .sort(([, a], [, b]) => b.available - a.available)
    .reduce<IWallets>((sortedObj, [key, value]) => {
      sortedObj[key] = value
      return sortedObj
    }, {})
}

export const logError = (message: string, error: unknown): void => {
  console.error(`[UserService] ${message}`, error)
}

export const getActiveRestriction = (
  restrictions: IRestrictions,
): keyof IRestrictions | null => {
  for (const key in restrictions) {
    const restrictionKey = key as keyof IRestrictions // Явное приведение key

    if (
      typeof restrictions[restrictionKey] === 'boolean' &&
      restrictions[restrictionKey] &&
      restrictionKey !== 'isPrivateKey'
    ) {
      return restrictionKey
    }

    if (
      typeof restrictions[restrictionKey] === 'object' &&
      restrictions[restrictionKey]?.isActive
    ) {
      return restrictionKey
    }
  }
  return null
}

export const hasActiveRestrictions = (restrictions: IRestrictions): boolean => {
  if (!restrictions) return false

  return Object.keys(restrictions).some((key) => {
    const restrictionKey = key as keyof IRestrictions // Приведение key к типу keyof IRestrictions

    if (
      typeof restrictions[restrictionKey] === 'boolean' &&
      restrictionKey !== 'isPrivateKey'
    ) {
      return restrictions[restrictionKey]
    }

    if (
      typeof restrictions[restrictionKey] === 'object' &&
      restrictions[restrictionKey]?.isActive !== undefined
    ) {
      return restrictions[restrictionKey].isActive
    }

    return false
  })
}
