import { doc, Firestore, onSnapshot } from 'firebase/firestore'

interface IWalletService {
  db: Firestore
}

class WalletsService implements IWalletService {
  public readonly db: Firestore

  constructor(db: Firestore) {
    this.db = db
  }

  async subscribeOnWallets(nickname: string, callback) {
    if (!nickname) return

    const userRef = doc(this.db, 'users', nickname)

    // Set up an onSnapshot listener
    const unsubscribe = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        const wallets = doc.data().wallets
        callback(wallets) // Call the callback with updated wallet data
      } else {
        callback([]) // Handle the case where the document does not exist
      }
    })

    // Return the unsubscribe function to stop listening when needed
    return unsubscribe
  }
}

export default WalletsService
