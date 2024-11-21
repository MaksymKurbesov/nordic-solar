import {
  collection,
  CollectionReference,
  Firestore,
  setDoc,
  serverTimestamp,
  doc,
  query,
  where,
  getDocs,
  updateDoc,
  increment,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { userService } from "@/main.tsx";

interface ITransactionService {
  db: Firestore;
  transactionCollection: CollectionReference<any>;
}

class TransactionService implements ITransactionService {
  public readonly db: Firestore;
  public readonly transactionCollection: CollectionReference<any>;

  constructor(db: Firestore) {
    this.db = db;
    this.transactionCollection = collection(
      db,
      "transactions",
    ) as CollectionReference<any>;
  }

  async addTransaction({ type, amount, executor, nickname, status }) {
    const id = uuidv4();
    const transactionsDoc = doc(this.transactionCollection, id);

    try {
      await setDoc(transactionsDoc, {
        type,
        amount: +amount,
        date: serverTimestamp(),
        executor,
        nickname,
        status
      });
    } catch (e) {
      alert(e);
      console.error(e);
    }
  }

  async getPendingTransactions() {
    try {
      const q = query(
        this.transactionCollection,
        where("status", "==", "Ожидание"),
      );
      const querySnapshot = await getDocs(q);

      const transactions = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(), // Приводим данные документа к типу Transaction
      }));

      return transactions;
    } catch (e) {
      console.log(e, "error in get pending transactions");
    }
  }

  async confirmTransaction({ id, type, nickname, executor, amount }) {
    const transactionRef = doc(this.transactionCollection, id);

    if (type === "Пополнение") {
      await userService.updateUser(nickname, {
        [`wallets.${executor}.available`]: increment(amount),
        [`wallets.${executor}.deposited`]: increment(amount),
      });
    }

    if (type === "Вывод") {
      await userService.updateUser(nickname, {
        [`wallets.${executor}.available`]: increment(-amount),
        [`wallets.${executor}.withdrawn`]: increment(amount),
        withdrawn: increment(amount),
      });
    }

    await updateDoc(transactionRef, {
      status: "Выполнено",
    });
  }

  subscribeToLastTenTransactions(nickname, callback) {
    try {
      const transactionQuery = query(
        this.transactionCollection,
        where("nickname", "==", nickname),
        orderBy("date", "desc"),
        limit(10),
      );

      const unsubscribe = onSnapshot(transactionQuery, (querySnapshot) => {
        const transactions = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // Приводим данные документа к типу Transaction
        }));

        // Вызываем callback с обновленными данными
        callback(transactions);
      });

      return () => unsubscribe();
    } catch (e) {
      console.error(e);
      alert(e);
    }
  }
}

export default TransactionService;
