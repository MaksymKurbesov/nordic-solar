import styles from './ConfirmTransaction.module.scss'
import CheckIcon from '@assets/icons/check.svg?react'
import CopyIcon from '@assets/icons/copy.svg?react'
import QRCode from '@assets/images/qr.png'
import ConnectionSecured from '@assets/icons/connection-secured.svg?react'
import SFCIcon from '@assets/icons/sfc-energy.svg?react'
import WideButton from '@SharedUI/WideButton/WideButton.tsx'
import { formatDate, generateSixDigitCode } from '@/utils/helpers.tsx'
import { ScrollRestoration, useLocation, useNavigate } from 'react-router-dom'
import { transactionService } from '@/main.tsx'
import { useUser } from '@/hooks/useUser.ts'
import { useEffect, useState } from 'react'
import ConfirmedPopup from '@SharedUI/ConfirmedPopup/ConfirmedPopup.tsx'
import { OUR_WALLETS } from '@/utils/OUR_WALLETS.tsx'
import toast from 'react-hot-toast'
import IconCircleCheckFilled from '@/assets/icons/circle-check.svg?react'

const ConfirmTransaction = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const formData = location.state
  const { user } = useUser()
  const { type, amount, wallet } = formData
  const isDepositType = type === 'deposit'
  const [confirmedPopupIsOpen, setConfirmedPopupIsOpen] = useState(false)

  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const onSubmitTransaction = async () => {
    await transactionService.addTransaction({
      type: isDepositType ? 'Пополнение' : 'Вывод',
      status: 'Ожидание',
      amount: amount,
      nickname: user?.nickname,
      executor: wallet,
    })
    setConfirmedPopupIsOpen(true)
    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0)
  }

  const copyWallet = () => {
    toast.success('Скопировано!')
    navigator.clipboard.writeText(OUR_WALLETS[wallet])
  }

  return (
    <div className={styles['transaction-confirmation']}>
      <span className={styles['invoice-number']}>
        #{generateSixDigitCode()}
      </span>
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
          <p className={styles['invoice-subtitle']}>
            {isDepositType
              ? `Если вы не оплатите заявку, депозит будет автоматически аннулирован`
              : ''}
          </p>

          {/*<p className={styles['title']}>Транзакция</p>*/}
          {/*<p className={styles['amount']}>*/}
          {/*  {amount} <span>USDT</span>*/}
          {/*</p>*/}
          {/*<span className={styles['amount-subtitle']}>*/}
          {/*  {wallet.toUpperCase()}*/}
          {/*</span>*/}

          {isDepositType && (
            <>
              <p className={styles['title']}>Адрес кошелька ({wallet})</p>
              <p className={styles['wallet-address']} onClick={copyWallet}>
                <span>{OUR_WALLETS[wallet]}</span> <CopyIcon />
              </p>
            </>
          )}
        </div>
        <div className={styles['right-column']}>
          <div className={styles['fields']}>
            <div className={styles['field']}>
              <span>Статус</span>
              <p>Ожидает</p>
            </div>
            {/*<div className={styles['field']}>*/}
            {/*  <span>Дата</span>*/}
            {/*  <p>{formatDate(new Date())}</p>*/}
            {/*</div>*/}
            <div className={styles['field']}>
              <span>Платежная система</span>
              <p>{wallet.toUpperCase()}</p>
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
              <p>{formatDate(new Date())}</p>
            </div>
          </div>
          <div className={`${styles['qr-code-wrapper']}`}>
            <div
              className={`${!isDepositType ? styles['no-qr-code'] : ''} ${styles['qr-code']}`}
            >
              <img src={QRCode} alt={''} width={196} height={196} />
              <p>
                QR-код <br />
                номера кошелька
              </p>
            </div>
            <div
              className={`${styles['secure-connection']} ${!isDepositType ? styles['secure-connection-withdrawn'] : ''}`}
            >
              <p>
                <ConnectionSecured />
                Соединение <br />
                защищено
              </p>
              <SFCIcon />
            </div>
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
