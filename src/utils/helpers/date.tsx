import { Timestamp } from 'firebase/firestore'

export const getNowTime = () => {
  const date = new Date()
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // Месяцы начинаются с 0
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}

export const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // месяцы начинаются с 0
  const year = date.getFullYear()

  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${day}.${month}.${year} ${hours}:${minutes}`
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
