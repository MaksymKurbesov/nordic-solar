import styles from './LastTransactions.module.scss'
import { TRANSACTION_COLUMNS } from '@/utils/const.tsx'
import { useState } from 'react'

const STYLES_MAP = {
  Выполнено: 'success',
  Ожидание: 'idle',
  Отмена: 'cancel',
}

const LastTransactions = ({ transactions }) => {
  const [collapsedTransactions, setCollapsedTransactions] = useState([])

  const toggleItem = (index) => {
    setCollapsedTransactions((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index)
      } else {
        return [...prev, index]
      }
    })
  }

  if (!transactions) {
    return <div>Нет транзакций</div>
  }

  return (
    <div className={styles['last-transactions']}>
      <h3>Последние транзакции</h3>
      {transactions.length === 0 ? (
        'У вас нет транзакций'
      ) : (
        // <Table columns={TRANSACTION_COLUMNS} data={transactions} />
        <ul className={styles['last-transactions-list']}>
          {transactions.slice(0, 4).map((transaction, index) => {
            return (
              <li
                key={index}
                className={`${transaction.status} ${collapsedTransactions.includes(index) ? styles['opened'] : ''}`}
                onClick={() => toggleItem(index)}
              >
                <div className={styles['transaction-wrapper']}>
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
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default LastTransactions
