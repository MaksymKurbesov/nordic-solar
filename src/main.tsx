import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./main.scss";
import routes from "./routes.tsx";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import UserService from "@/services/UserService.ts";
import "swiper/css";
import TransactionService from "@/services/TransactionService.ts";
import { UserProvider } from "./UserContext";
import { UserDataProvider } from "@/context/AuthContext.tsx";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth: Auth = getAuth(app);
export const storage = getStorage(app);

export const userService = new UserService(db);
export const transactionService = new TransactionService(db);

let container: HTMLElement | null = null;

document.addEventListener("DOMContentLoaded", () => {
  if (!container) {
    container = document.getElementById("root") as HTMLElement;

    const root = createRoot(container);
    root.render(
      <UserProvider>
        <UserDataProvider>
          <RouterProvider router={routes} />
        </UserDataProvider>
      </UserProvider>,
    );
  }
});
