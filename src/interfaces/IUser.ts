import { Timestamp } from 'firebase/firestore'

export interface IRestrictions {
  isCheaterInReferral: boolean
  isFinancialGateway: boolean
  isMultiAcc: {
    isActive: boolean
    users: string[]
  }
  isPrivateKey: boolean
  isPrivateKeyInvalid: boolean
  isReferralCheater: {
    isActive: boolean
    users: string[]
  }
  isWithdrawnLimit: boolean
}

interface ISettings {
  country: string
  name: string
  phone: string
  social: string
  surname: string
}

interface IWallet {
  available: number
  deposited: number
  number: string
  referrals: number
  withdrawn: number
}

export interface IDeposit {
  amount: number
  charges: number
  closeDate: Timestamp
  days: number
  isActive: boolean
  lastAccrual: Timestamp
  openDate: Timestamp
  plan: string
  received: number
  variant: string
  wallet: string
  willReceived: number
}

export type IWallets = Record<string, IWallet>

export interface ITransaction {
  id?: number
  amount: number
  date?: Timestamp
  executor: string
  nickname: string
  status: string
  type: string
}

export interface ITransformedTransaction
  extends Omit<ITransaction, 'id' | 'executor' | 'amount' | 'date'> {
  id: number // Ограничим до числа длиной 6 символов
  executor: string // В верхнем регистре
  amount: string // В формате строки с валютой
  date: string // Парсинг возвращает строку
}

export interface IUser {
  earned: number
  email: string
  invested: number
  nickname: string
  privateKey: string
  referrals: number
  referredBy: string
  registrationDate: Timestamp
  restrictions: IRestrictions
  settings: ISettings
  wallets: IWallets
  withdrawn: number
}

export interface IExtendedUser extends IUser {
  deposits?: IDeposit[]
  transactions?: ITransaction[] | ITransformedTransaction
}
