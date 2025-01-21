import { collection, doc, updateDoc, Firestore, CollectionReference } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { logError } from "@/utils/helpers.tsx";
import { signInWithEmailAndPassword, signOut, updateProfile, AuthError } from "firebase/auth";
import { auth, storage } from "@/main.tsx";
import { Dispatch, SetStateAction } from "react";

interface IUserService {
  db: Firestore;
  userCollection: CollectionReference<any>;
}

class UserService implements IUserService {
  public readonly db: Firestore;
  public readonly userCollection: CollectionReference<any>;

  constructor(db: Firestore) {
    this.db = db;
    this.userCollection = collection(db, "users") as CollectionReference<any>;
  }

  // async updateUser(userId: string, updatedData: Partial<IUser>): Promise<void> {
  async updateUser(userID: string, updatedData: Partial<any>): Promise<void> {
    try {
      const userRef = doc(this.userCollection, userID);
      await updateDoc(userRef, updatedData);
      console.log("UserService updated successfully");
    } catch (error) {
      logError("Error updating user ", error);
    }
  }

  async updateUserAvatar(avatar: File, setUserAvatar: Dispatch<SetStateAction<string | null>>) {
    try {
      if (!auth.currentUser) return;

      const userAvatarRef = ref(storage, `userAvatars/${auth.currentUser.displayName}`);

      await uploadBytesResumable(userAvatarRef, avatar)
        .then((data) => console.log(data, "data"))
        .catch((e) => console.log(e, "update user avatar error"));

      const photoURL = await getDownloadURL(userAvatarRef);

      await updateProfile(auth.currentUser, {
        photoURL,
      });

      setUserAvatar(photoURL);
    } catch (e) {
      alert(e);
      console.error(e);
    }
  }

  async logIn(email: string, password: string, setError: Dispatch<SetStateAction<string | null>>) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError("");
    } catch (error) {
      logError("logIn: ", error);

      if (!isFirebaseError(error)) return;

      if (error.code === "auth/invalid-credential") {
        setError("Неправильный пароль. Пожалуйста, попробуйте снова.");
      } else if (error.code === "auth/invalid-email") {
        setError("Пользователь не найден.");
      } else if (error.code === "auth/too-many-requests") {
        setError("Слишком частые запросы. Попробуйте попозже.");
      }
    }
  }

  async logout() {
    await signOut(auth);
  }
}

function isFirebaseError(error: unknown): error is AuthError {
  return (error as AuthError).code !== undefined;
}

export default UserService;
