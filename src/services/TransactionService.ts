import {
  collection,
  CollectionReference,
  Firestore,
  setDoc,
  serverTimestamp,
  doc,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import { ITransaction } from '@/interfaces/IUser.ts'

interface ITransactionService {
  db: Firestore
  transactionCollection: CollectionReference<any>
}

class TransactionService implements ITransactionService {
  public readonly db: Firestore
  public readonly transactionCollection: CollectionReference<any>

  constructor(db: Firestore) {
    this.db = db
    this.transactionCollection = collection(
      db,
      'transactions',
    ) as CollectionReference<any>
  }

  async addTransaction({
    type,
    amount,
    executor,
    nickname,
    status,
  }: ITransaction) {
    const id = uuidv4()
    const transactionsDoc = doc(this.transactionCollection, id)

    try {
      await setDoc(transactionsDoc, {
        type,
        amount: +amount,
        date: serverTimestamp(),
        executor,
        nickname,
        status,
      })
    } catch (e) {
      alert(e)
      console.error(e)
    }
  }

  getPendingTransactions(onUpdate: (transactions: any[]) => void): () => void {
    try {
      const q = query(
        this.transactionCollection,
        where('status', '==', 'Ожидание'),
      )

      // Подписываемся на изменения
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const transactions = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        onUpdate(transactions)
      })

      return unsubscribe
    } catch (e) {
      console.log(e, 'error in get pending transactions')
      return () => {}
    }
  }
}

export default TransactionService
