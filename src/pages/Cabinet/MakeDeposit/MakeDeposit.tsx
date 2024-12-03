import { useForm } from 'react-hook-form'
import { ScrollRestoration, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useUser } from '@/hooks/useUser.ts'
import TransactionForm from '@SharedUI/TransactionForm/TransactionForm.tsx'
import styles from './MakeDeposit.module.scss'
import WideButton from '@SharedUI/WideButton/WideButton.tsx'
import { sortByAvailable } from '@/utils/helpers'
import toast from 'react-hot-toast'

const MakeDeposit = () => {
  const { user } = useUser()
  const form = useForm({
    defaultValues: {
      wallet: '',
      amount: 0,
    },
    mode: 'onChange',
  })
  const { register, watch } = form
  const selectedWallet = watch().wallet
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const submitConfirm = () => {
    const wallet = watch().wallet
    const amount = watch().amount
    const isNumeric = !isNaN(amount) && !isNaN(parseFloat(amount))

    if (!wallet) {
      toast.error('Выберите кошелёк')
      return
    }

    if (!isNumeric || amount < 1) {
      toast.error('Некорректная сумма')
      return
    }

    navigate('/cabinet/make-deposit/confirm-transaction', {
      state: {
        wallet,
        amount,
        type: 'deposit',
      },
    })
  }

  if (!user) return

  return (
    <div className={styles['make-deposit']}>
      <h2>Пополнить счёт</h2>

      <TransactionForm
        wallets={sortByAvailable(user.wallets)}
        selectedWallet={selectedWallet}
        register={register}
        inputText={'Введите сумму пополнения'}
      />
      <WideButton text={'Пополнить баланс'} onClickHandler={submitConfirm} />
      <ScrollRestoration />
    </div>
  )
}

export default MakeDeposit
