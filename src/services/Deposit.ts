import {
  collection,
  CollectionReference,
  doc,
  Firestore,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

interface IDepositService {
  db: Firestore;
  transactionCollection: CollectionReference<any>;
}

class DepositService implements IDepositService {
  public readonly db: Firestore;
  public readonly depositCollection: CollectionReference<any>;

  constructor(db: Firestore) {
    this.db = db;
    this.depositCollection = collection(
      db,
      "users",
    ) as CollectionReference<any>;
  }

  async openPlan(nickname: string, deposit: any) {
    const depositDoc = doc(
      this.db,
      "users",
      nickname,
      "deposits",
      `${deposit.amount}-${uuidv4()}`,
    );

    await setDoc(depositDoc, {
      planNumber: "test",
      amount: 123,
      days: 30,
      region: "test",
      wallet: "test",
      project: "test",
      date: serverTimestamp(),
      received: 0,
      // willReceived: calculateTotalIncome(amount, region),
      charges: 0,
      isActive: true,
      lastAccrual: new Date(),
    });
  }

  getAllDeposits(setUserDeposits, nickname) {
    try {
      const depositsCollection = query(
        collection(this.db, "users", nickname, "deposits"),
        orderBy("date", "desc"),
      );

      return onSnapshot(depositsCollection, (depositSnap) => {
        setUserDeposits(depositSnap.docs.map((deposit) => deposit.data()));
      });
    } catch (e) {
      console.error(e);
      alert(e);
    }
  }
}

export default DepositService;
