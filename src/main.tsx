import React from "react";
import  { createRoot } from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import "./main.scss";
import routes from "./routes.tsx";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import UserService from "@/services/User.ts";
import "swiper/css";
import TransactionService from "@/services/Transaction.ts";
import { UserProvider } from "./UserContext";
import DepositService from "@/services/Deposit.ts";
import ReferralService from '@/services/Referral';

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
export const auth = getAuth(app);

export const userService = new UserService(db);
export const transactionService = new TransactionService(db);
export const depositService = new DepositService(db);
export const referralService = new ReferralService(db);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={routes} />
    </UserProvider>
  </React.StrictMode>,
);
