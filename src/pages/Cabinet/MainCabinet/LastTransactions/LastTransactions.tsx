import styles from './LastTransactions.module.scss'
import Table from '@SharedUI/Table/Table.tsx'
import { TRANSACTION_COLUMNS } from '@/utils/const.tsx'

const STYLES_MAP = {
  Выполнено: 'success',
  Ожидание: 'idle',
  Отмена: 'cancel',
}

const LastTransactions = ({ transactions }) => {
  return (
    <div className={styles['last-transactions']}>
      <h3>Последние транзакции</h3>
      {transactions.length === 0 ? (
        'У вас нет транзакций'
      ) : (
        // <Table columns={TRANSACTION_COLUMNS} data={transactions} />
        <ul className={styles['last-transactions-list']}>
          {transactions.map((transaction, index) => {
            return (
              <li key={index} className={styles[transaction.status]}>
                {TRANSACTION_COLUMNS.map((column, index) => (
                  <p
                    key={index}
                    className={`${styles['cell']} ${styles[column.key]}`}
                  >
                    <span>{column.title}</span>
                    <span
                      className={`${styles[STYLES_MAP[transaction[column.key]]]}`}
                    >
                      {transaction[column.key]}
                    </span>
                  </p>
                ))}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default LastTransactions
