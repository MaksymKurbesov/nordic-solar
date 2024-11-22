import styles from './LastTransactions.module.scss'
import Table from '@SharedUI/Table/Table.tsx'
import { TRANSACTION_COLUMNS } from '@/utils/const.tsx'

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
              <li key={index}>
                <p>{transaction.type}</p>
                <p>{transaction.id}</p>
                <p>{transaction.amount}</p>
                <p>{transaction.executor}</p>
                <p>{transaction.date}</p>
                <p>{transaction.status}</p>
              </li>
            )
          })}
        </ul>
      )}

      {/*<ul>*/}
      {/*  {transactions.map((transaction, index) => {*/}
      {/*    return (*/}
      {/*      <li key={index}>*/}
      {/*        <p>{transaction.type}</p>*/}
      {/*        <p>{transaction.id}</p>*/}
      {/*        <p>{transaction.amount}</p>*/}
      {/*        <p>{transaction.executor}</p>*/}
      {/*        <p>{transaction.date}</p>*/}
      {/*        <p>{transaction.status}</p>*/}
      {/*      </li>*/}
      {/*    );*/}
      {/*  })}*/}
      {/*</ul>*/}
    </div>
  )
}

export default LastTransactions
