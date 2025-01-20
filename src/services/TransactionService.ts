import { collection, CollectionReference, Firestore, query, where, onSnapshot } from "firebase/firestore";

interface ITransactionService {
  db: Firestore;
  transactionCollection: CollectionReference<any>;
}

class TransactionService implements ITransactionService {
  public readonly db: Firestore;
  public readonly transactionCollection: CollectionReference<any>;

  constructor(db: Firestore) {
    this.db = db;
    this.transactionCollection = collection(db, "transactions") as CollectionReference<any>;
  }

  getPendingTransactions(onUpdate: (transactions: any[]) => void): () => void {
    try {
      const q = query(this.transactionCollection, where("status", "==", "Ожидание"));

      // Подписываемся на изменения
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const transactions = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        onUpdate(transactions);
      });

      return unsubscribe;
    } catch (e) {
      console.log(e, "error in get pending transactions");
      return () => {};
    }
  }
}

export default TransactionService;
