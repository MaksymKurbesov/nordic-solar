import { Timestamp } from "firebase/firestore";

export const generateUserData = (nickname: string, email: string) => {
  return {
    settings: {
      name: "",
      surname: "",
      phone: "",
      social: "",
      country: "",
    },
    earned: 0,
    invested: 0,
    withdrawn: 0,
    referrals: 0,
    wallets: {
      bitcoin: {
        available: 0,
        deposited: 0,
        referrals: 0,
        withdrawn: 0,
        number: "",
      },
      ton: {
        available: 0,
        deposited: 0,
        referrals: 0,
        withdrawn: 0,
        number: "",
      },
      trc20: {
        available: 0,
        deposited: 0,
        referrals: 0,
        withdrawn: 0,
        number: "",
      },
      ethereum: {
        available: 0,
        deposited: 0,
        referrals: 0,
        withdrawn: 0,
        number: "",
      },
    },
    referredBy: "",
    privateKey: "",
    nickname,
    email,
    restrictions: {
      isFinancialGateway: false,
      isMultiAcc: {
        isActive: false,
        users: [],
      },
      isPrivateKey: false,
      isPrivateKeyInvalid: false,
      isReferralCheater: {
        isActive: false,
        users: [],
      },
      isWithdrawnLimit: false,
    },
  };
};

export const generateSixDigitCode = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

export const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // месяцы начинаются с 0
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}.${month}.${year} ${hours}:${minutes}`;
};

export const parseTimestamp = (timestamp: Timestamp): string => {
  // Преобразуем timestamp в объект Date
  const date = timestamp.toDate();

  // Форматируем дату в строку, например, "12.07.2024 15:34"
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // месяцы начинаются с 0
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}.${month}.${year} ${hours}:${minutes}`;
};

export const transformTransaction = (transaction) => {
  return {
    ...transaction,
    id: transaction.id.slice(0, 6),
    executor: transaction.executor.toUpperCase(),
    amount: `$ ${transaction.amount.toLocaleString()}`,
    date: parseTimestamp(transaction.date),
  };
};
