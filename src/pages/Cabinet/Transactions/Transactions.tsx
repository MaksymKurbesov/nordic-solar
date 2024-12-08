import styles from './Transactions.module.scss'
import Table from '@SharedUI/Table/Table.tsx'
import { TRANSACTION_COLUMNS } from '@/utils/const.tsx'
import { useUser } from '@/hooks/useUser.ts'

const Transactions = () => {
  const { user } = useUser()

  if (!user) return

  return (
    <div className={styles['transactions']}>
      <h3>Последние транзакции</h3>
      <div className={styles['table-wrapper']}>
        <Table columns={TRANSACTION_COLUMNS} data={user.transactions} />
      </div>

      <button className={styles['load-more-button']}>Смотреть еще 10</button>
    </div>
  )
}

export default Transactions
