import { ReactElement } from 'react'

interface IWallet {
  available: number
  deposited: number
  number: string
  referrals: number
  withdrawn: number
}

export interface IShortWalletData {
  currency: string
  icon: ReactElement
  name: string
}

export type IWallets = Record<string, IWallet>
export type IShortWallets = Record<string, IShortWalletData>
