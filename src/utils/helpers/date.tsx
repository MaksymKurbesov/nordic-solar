import { Timestamp } from 'firebase/firestore'
import { IRegistrationDate } from '@/pages/Cabinet/Referrals/Referrals.tsx'
import { ReactNode } from 'react'

export const addDays = (date: Timestamp, days: number) => {
  const result = new Date(date.seconds * 1000)
  result.setDate(result.getDate() + days)

  return new Date(result.getTime())
}

export const addDaysToTimestamp = (days: number) => {
  const now = new Date()
  now.setDate(now.getDate() + days)

  return Timestamp.fromDate(now)
}

export const parseTimestamp = (
  timestamp: Timestamp | IRegistrationDate,
  short = false,
): ReactNode | string => {
  let date

  if (timestamp instanceof Timestamp) {
    date = timestamp.toDate()
  } else {
    date = new Date(timestamp._seconds * 1000)
  }

  // Форматируем дату в строку, например, "12.07.2024 15:34"
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // месяцы начинаются с 0
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  if (short) {
    return `${day}.${month}.${year}`
  }

  return `${day}.${month}.${year} ${hours}:${minutes}`
}

export const daysPassedSince = (someDate: Timestamp): number => {
  const now = new Date(Timestamp.now().seconds * 1000)
  const updatedSomeDate = new Date(someDate.seconds * 1000)
  const oneDayMilliseconds = 24 * 60 * 60 * 1000
  const difference = now.getTime() - updatedSomeDate.getTime()
  return Math.floor(difference / oneDayMilliseconds)
}
