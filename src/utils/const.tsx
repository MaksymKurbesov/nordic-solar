import TRC20Icon from '@assets/icons/tether.svg?react'
import TonIcon from '@assets/icons/ton.svg?react'
import BitcoinIcon from '@assets/icons/bitcoin.svg?react'
import EthereumIcon from '@assets/icons/ethereum.svg?react'
import PMIcon from '@assets/icons/pm.svg?react'

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
  pm: {
    icon: <PMIcon />,
    name: 'PM',
    currency: 'PM',
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
  individual: {
    beginner: {
      type: 'Начинающий',
      days: 45,
      minDeposit: 50,
      maxDeposit: 2500,
      inDay: 1.1,
      region: 'Европа',
      accruals: 'Ежедневно',
    },
    available: {
      type: 'Доступный',
      days: 30,
      minDeposit: 2500,
      maxDeposit: 10000,
      inDay: 2,
      region: 'Северная Америка',
      accruals: 'Ежедневно',
    },
    optimal: {
      type: 'Оптимальный',
      days: 15,
      minDeposit: 10000,
      maxDeposit: -1,
      inDay: 3,
      region: 'Азия',
      accruals: 'В конце срока',
    },
  },
  'mutual-fonds': {
    beginner: {
      type: 'Начинающий',
      days: 45,
      minDeposit: 50,
      maxDeposit: 2500,
      inDay: 1.1,
      region: 'Европа',
      accruals: 'Ежедневно',
    },
    available: {
      type: 'Доступный',
      days: 30,
      minDeposit: 2500,
      maxDeposit: 10000,
      inDay: 2,
      region: 'Южная Америка',
      accruals: 'Ежедневно',
    },
    optimal: {
      type: 'Оптимальный',
      days: 15,
      minDeposit: 10000,
      maxDeposit: 40000,
      inDay: 3,
      region: 'Ближний Восток',
      accruals: 'В конце срока',
    },
    maximum: {
      type: 'Максимальный',
      days: 7,
      minDeposit: 40000,
      maxDeposit: -1,
      inDay: 55,
      region: 'Африка',
      accruals: 'В конце срока',
    },
  },
  crowdfunding: {
    beginner: {
      type: 'Начинающий',
      days: 45,
      minDeposit: 200,
      maxDeposit: 5000,
      inDay: 1.8,
      region: 'Австралия',
      accruals: 'Ежедневно',
    },
    available: {
      type: 'Доступный',
      days: 30,
      minDeposit: 5000,
      maxDeposit: 25000,
      inDay: 2.8,
      region: 'Европа',
      accruals: 'Ежедневно',
    },
    optimal: {
      type: 'Оптимальный',
      days: 15,
      minDeposit: 25000,
      maxDeposit: 50000,
      inDay: 3.5,
      region: 'Азия',
      accruals: 'В конце срока',
    },
    maximum: {
      type: 'Максимальный',
      days: 7,
      minDeposit: 50000,
      maxDeposit: -1,
      inDay: 55,
      region: 'Северная Америка',
      accruals: 'В конце срока',
    },
  },
  pension: {
    beginner: {
      type: 'Начинающий',
      days: 45,
      minDeposit: 50,
      maxDeposit: 5000,
      inDay: 1.1,
      region: 'Африка',
      accruals: 'Ежедневно',
    },
    available: {
      type: 'Доступный',
      days: 30,
      minDeposit: 2500,
      maxDeposit: 10000,
      inDay: 2,
      region: 'Ближний Восток',
      accruals: 'Ежедневно',
    },
    optimal: {
      type: 'Оптимальный',
      days: 15,
      minDeposit: 10000,
      maxDeposit: -1,
      inDay: 3,
      region: 'Южная Америка',
      accruals: 'В конце срока',
    },
  },
}
