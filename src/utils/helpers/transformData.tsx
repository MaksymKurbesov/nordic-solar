import { parseTimestamp } from '@/utils/helpers/date.tsx'
import { Timestamp } from 'firebase/firestore'
import AccrualTimer from '@/pages/Cabinet/MainCabinet/Deposits/AccrualTimer.tsx'
import {
  IDeposit,
  ITransaction,
  ITransformedTransaction,
} from '@/interfaces/IUser.ts'

export const transformTransaction = (
  transaction: ITransaction,
): ITransformedTransaction => {
  return {
    ...transaction,
    id: transaction.id.slice(0, 6),
    executor: transaction.executor.toUpperCase(),
    amount: `$${transaction.amount.toLocaleString()}`,
    date: parseTimestamp(transaction.date),
  }
}

export const transformDeposit = (deposit: IDeposit) => {
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
