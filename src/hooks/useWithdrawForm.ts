import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { hasActiveRestrictions, sortByAvailable } from '@/utils/helpers'
import toast from 'react-hot-toast'

export const useWithdrawForm = (user) => {
  const form = useForm({
    defaultValues: {
      wallet: '',
      amount: 0,
    },
    mode: 'onChange',
  })
  const { watch, register } = form
  const navigate = useNavigate()
  const userHasRestriction = hasActiveRestrictions(user?.restrictions)
  const selectedWallet = watch().wallet

  const submitConfirm = () => {
    const wallet = watch().wallet
    const amount = watch().amount

    if (userHasRestriction) return

    if (!wallet) {
      toast.error('Выберите кошелёк')
      return
    }

    if (user?.wallets[wallet]?.available < amount) {
      toast.error('Недостаточно средств на кошельке')
      return
    }

    if (isNaN(amount)) {
      toast.error('Некорректная сумма')
      return
    }

    if (amount < 10) {
      toast.error('Минимальная сумма вывода 10$')
      return
    }

    navigate('/cabinet/withdrawn/confirm-transaction', {
      state: {
        wallet,
        amount,
        type: 'withdrawn',
      },
    })
  }

  return {
    form: {
      register,
      selectedWallet,
      wallets: sortByAvailable(user?.wallets || []),
    },
    userHasRestriction,
    submitConfirm,
  }
}
