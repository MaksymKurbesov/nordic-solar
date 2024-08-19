import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  Firestore,
  CollectionReference,
} from "firebase/firestore";
import { generateUserData } from "@/utils/helpers.ts";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/main.tsx";

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

  // async addUser(user: IUser): Promise<void> {
  async registerUser(
    nickname: string,
    email: string,
    password: string,
  ): Promise<void> {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );

      console.log(res, "res");

      const user = generateUserData(nickname, email);
      const userRef = doc(this.userCollection, nickname);
      await setDoc(userRef, user);

      console.log("UserService added successfully");
    } catch (error) {
      console.error("Error adding user: ", error);
    }
  }

  async logIn(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async logout() {
    await signOut(auth);
  }

  // async updateUser(userId: string, updatedData: Partial<IUser>): Promise<void> {
  async updateUser(userId: string, updatedData: Partial<any>): Promise<void> {
    try {
      const userRef = doc(this.userCollection, userId);
      await updateDoc(userRef, updatedData);
      console.log("UserService updated successfully");
    } catch (error) {
      console.error("Error updating user: ", error);
    }
  }

  async deleteUser(userId: string): Promise<void> {
    try {
      const userRef = doc(this.userCollection, userId);
      await deleteDoc(userRef);
      console.log("UserService deleted successfully");
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  }
}

export default UserService;
