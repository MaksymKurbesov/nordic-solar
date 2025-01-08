import { ScrollRestoration } from 'react-router-dom'
import { useEffect } from 'react'
import { useUser } from '@/hooks/useUser.ts'
import TransactionForm from '@SharedUI/TransactionForm/TransactionForm.tsx'
import styles from './Withdrawn.module.scss'
import WideButton from '@SharedUI/WideButton/WideButton.tsx'
import { useWithdrawForm } from '@/hooks/useWithdrawForm.ts'

const Withdrawn = () => {
  const { user } = useUser()
  const { form, userHasRestriction, submitConfirm } = useWithdrawForm(user)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!user) return null

  return (
    <div className={styles['withdrawn']}>
      <h2>Вывод средств</h2>
      <TransactionForm
        wallets={form.wallets}
        selectedWallet={form.selectedWallet}
        register={form.register}
        inputText={'Введите сумму вывода'}
      />
      <WideButton
        isDisabled={userHasRestriction}
        text={'Вывести средства'}
        onClickHandler={submitConfirm}
      />
      <ScrollRestoration />
    </div>
  )
}

export default Withdrawn
