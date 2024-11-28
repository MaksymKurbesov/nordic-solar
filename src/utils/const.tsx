import TRC20Icon from '@assets/icons/crypto-wallets/tether.svg?react'
import TonIcon from '@assets/icons/crypto-wallets/ton.svg?react'
import BitcoinIcon from '@assets/icons/crypto-wallets/bitcoin.svg?react'
import EthereumIcon from '@assets/icons/crypto-wallets/ethereum.svg?react'
import SolanaIcon from '@assets/icons/crypto-wallets/solana.svg?react'

export const REFERRAL_REWARDS_BY_LEVEL = {
  1: 10,
  2: 7,
  3: 5,
  4: 3,
}

export const WALLETS = {
  trc20: {
    icon: <TRC20Icon />,
    name: 'TRC20 Tether',
    currency: 'USDT',
  },
  ton: {
    icon: <TonIcon />,
    name: 'TON',
    currency: 'TON',
  },
  bitcoin: {
    icon: <BitcoinIcon />,
    name: 'Bitcoin',
    currency: 'BTC',
  },
  ethereum: {
    icon: <EthereumIcon />,
    name: 'Ethereum',
    currency: 'ETH',
  },
  solana: {
    icon: <SolanaIcon />,
    name: 'Solana',
    currency: 'SOL',
  },
}

export const TRANSACTION_COLUMNS = [
  {
    title: 'Тип',
    key: 'type',
  },
  {
    title: 'ID',
    key: 'id',
  },
  {
    title: 'Сумма',
    key: 'amount',
  },
  {
    title: 'Платежная система',
    key: 'executor',
  },
  {
    title: 'Дата',
    key: 'date',
  },
  {
    title: 'Статус',
    key: 'status',
  },
]

export const PLAN_VARIANT = {
  solar: {
    beginner: {
      type: 'Sunlight Start',
      days: 45,
      minDeposit: 50,
      maxDeposit: 1999,
      inDay: 1.1,
      region: 'Европа',
      accruals: 'Ежедневно',
    },
    available: {
      type: 'Solar Expansion',
      days: 30,
      minDeposit: 2500,
      maxDeposit: 9999,
      inDay: 1.8,
      region: 'Северная Америка',
      accruals: 'Ежедневно',
    },
    optimal: {
      type: 'Radiant Yield',
      days: 15,
      minDeposit: 10000,
      maxDeposit: 29999,
      inDay: 2.5,
      region: 'Азия',
      accruals: 'В конце срока',
    },
    maximum: {
      type: 'Solar Innovate',
      days: 15,
      minDeposit: 30000,
      maxDeposit: -1,
      inDay: null,
      region: 'Азия',
      accruals: 'В конце срока',
    },
  },
  wind: {
    beginner: {
      type: 'Breeze Start',
      days: 20,
      minDeposit: 200,
      maxDeposit: 999,
      inDay: 0.6,
      region: 'Европа',
      accruals: 'Ежедневно',
    },
    available: {
      type: 'Wind Fields',
      days: 20,
      minDeposit: 1000,
      maxDeposit: 9999,
      inDay: 0.9,
      region: 'Южная Америка',
      accruals: 'Ежедневно',
    },
    optimal: {
      type: 'Aero Advantage',
      days: 30,
      minDeposit: 10000,
      maxDeposit: 29999,
      inDay: 1.1,
      region: 'Ближний Восток',
      accruals: 'В конце срока',
    },
    maximum: {
      type: 'Turbine Tech',
      days: null,
      minDeposit: 30000,
      maxDeposit: -1,
      inDay: null,
      region: 'Африка',
      accruals: 'В конце срока',
    },
  },
  hydro: {
    beginner: {
      type: 'River Flow',
      days: 20,
      minDeposit: 300,
      maxDeposit: 1999,
      inDay: 0.7,
      region: 'Австралия',
      accruals: 'Ежедневно',
    },
    available: {
      type: 'Hydro Expansion',
      days: 30,
      minDeposit: 2000,
      maxDeposit: 14999,
      inDay: 1,
      region: 'Европа',
      accruals: 'Ежедневно',
    },
    optimal: {
      type: 'EcoHydro',
      days: 20,
      minDeposit: 15000,
      maxDeposit: 29999,
      inDay: 2,
      region: 'Азия',
      accruals: 'В конце срока',
    },
    maximum: {
      type: 'Blue Energy R&D',
      days: 45,
      minDeposit: 30000,
      maxDeposit: -1,
      inDay: 1.2,
      region: 'Северная Америка',
      accruals: 'В конце срока',
    },
  },
  hydrogen: {
    beginner: {
      type: 'H2 Mining Start',
      days: 45,
      minDeposit: 1000,
      maxDeposit: 7999,
      inDay: 1.5,
      region: 'Африка',
      accruals: 'Ежедневно',
    },
    available: {
      type: 'Green Hydrogen Expansion',
      days: 30,
      minDeposit: 8000,
      maxDeposit: 14999,
      inDay: 2.1,
      region: 'Ближний Восток',
      accruals: 'Ежедневно',
    },
    optimal: {
      type: 'Hydrogen Fuel Cells',
      days: 21,
      minDeposit: 15000,
      maxDeposit: 39999,
      inDay: 3,
      region: 'Южная Америка',
      accruals: 'В конце срока',
    },
    maximum: {
      type: 'Mining Power',
      days: null,
      minDeposit: 40000,
      maxDeposit: -1,
      inDay: null,
      region: 'Южная Америка',
      accruals: 'В конце срока',
    },
  },
  mining: {
    beginner: {
      type: 'CryptoGrow',
      days: 90,
      minDeposit: 2000,
      maxDeposit: 9999,
      inDay: 0.45,
      region: 'Африка',
      accruals: 'В конце срока',
    },
    available: {
      type: 'ProfitMine',
      days: 45,
      minDeposit: 10000,
      maxDeposit: -1,
      inDay: 0.23,
      region: 'Европа',
      accruals: 'В конце срока',
    },
  },
}
