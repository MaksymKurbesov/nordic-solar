import { Timestamp } from 'firebase/firestore'

export const addDays = (date, days) => {
  const result = new Date(date.seconds * 1000)
  result.setDate(result.getDate() + days)

  return new Date(result.getTime())
}

export const addDaysToTimestamp = (days: number) => {
  const now = new Date()
  now.setDate(now.getDate() + days)

  return Timestamp.fromDate(now)
}

export const parseTimestamp = (timestamp: Timestamp, short = false): string => {
  // Преобразуем timestamp в объект Date
  if (!timestamp) return ''

  const date = timestamp.toDate()

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

export const daysPassedSince = (someDate) => {
  const now = new Date(Timestamp.now().seconds * 1000)
  const updatedSomeDate = new Date(someDate.seconds * 1000)

  const oneDayMilliseconds = 24 * 60 * 60 * 1000

  const difference = now - updatedSomeDate

  return Math.floor(difference / oneDayMilliseconds)
}
