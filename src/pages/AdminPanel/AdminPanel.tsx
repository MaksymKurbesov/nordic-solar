import styles from './AdminPanel.module.scss'
import { transactionService } from '@/main.tsx'
import { useEffect, useState } from 'react'
import { parseTimestamp } from '@/utils/helpers/date.tsx'

const AdminPanel = () => {
  const [transactions, setTransactions] = useState(null)

  useEffect(() => {
    const unsubscribe = transactionService.getPendingTransactions(
      (transactions) => {
        console.log('Обновленные транзакции:', transactions)
        setTransactions(transactions)
      },
    )

    return () => {
      unsubscribe()
    }
  }, [])

  const confirmTransaction = (transaction) => {
    transactionService.confirmTransaction(transaction)
  }

  const cancelTransaction = (transaction) => {
    transactionService.declineTransaction(transaction)
  }

  if (!transactions) return null

  return (
    <div className={styles['admin-panel']}>
      <h2>Adminka</h2>
      <ul>
        {transactions.map((transaction) => {
          return (
            <li key={transaction.id}>
              <div>
                <span>Никнейм</span>
                <span>{transaction.nickname}</span>
              </div>
              <div>
                <span>Сумма</span>
                <span>
                  {transaction.amount ? transaction.amount : 'Ошибка'}
                </span>
              </div>
              <div>
                <span>Тип</span>
                <span>{transaction.type}</span>
              </div>
              <div>
                <span>Исполнитель</span>
                <span>{transaction.executor}</span>
              </div>
              <div>
                <span>Статус</span>
                <span>{transaction.status}</span>
              </div>
              <div>
                <span>Дата</span>
                <span>{parseTimestamp(transaction.date)}</span>
              </div>
              <div className={styles['buttons']}>
                <button onClick={() => cancelTransaction(transaction)}>
                  Отмена
                </button>
                <button onClick={() => confirmTransaction(transaction)}>
                  Подтвердить
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default AdminPanel
