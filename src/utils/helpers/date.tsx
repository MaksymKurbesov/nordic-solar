import { Timestamp } from "firebase/firestore";
import { IRegistrationDate } from "@/pages/Cabinet/Referrals/Referrals.tsx";
import { ReactNode } from "react";

export const sortByDate = (data) => {
  if (!data) return;

  return data.sort((a, b) => {
    const parseDate = (dateString: string): Date => {
      const [day, month, yearAndTime] = dateString.split(".");
      const [year, time] = yearAndTime.split(" ");
      const [hours, minutes] = time.split(":");
      return new Date(
        Number(year),
        Number(month) - 1, // Месяцы в JavaScript начинаются с 0
        Number(day),
        Number(hours),
        Number(minutes),
      );
    };

    const dateA = parseDate(a.openDate).getTime();
    const dateB = parseDate(b.openDate).getTime();

    return dateB - dateA;
  });
};

export const addDaysToTimestamp = (days: number) => {
  const now = new Date();
  now.setDate(now.getDate() + days);

  return Timestamp.fromDate(now);
};

export const parseTimestamp = (timestamp: Timestamp | IRegistrationDate, short = false): ReactNode | string => {
  let date;

  if (timestamp instanceof Timestamp) {
    date = timestamp.toDate();
  } else {
    date = new Date(timestamp._seconds * 1000);
  }

  // Форматируем дату в строку, например, "12.07.2024 15:34"
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // месяцы начинаются с 0
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  if (short) {
    return `${day}.${month}.${year}`;
  }

  return `${day}.${month}.${year} ${hours}:${minutes}`;
};
