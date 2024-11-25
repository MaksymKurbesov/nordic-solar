import styles from './WalletAmount.module.scss'
import TransactionForm from '@SharedUI/TransactionForm/TransactionForm.tsx'
import { useFormContext } from 'react-hook-form'
import { useUser } from '@/hooks/useUser.ts'
import { sortByAvailable } from '@/utils/helpers'

const WalletAmount = () => {
  const { wallets } = useUser()
  const { watch, register, trigger } = useFormContext()
  const selectedWallet = watch('wallet')

  return (
    <div className={styles['wallet-amount']}>
      <TransactionForm
        wallets={sortByAvailable(wallets)}
        selectedWallet={selectedWallet}
        register={register}
        inputText={'Введите сумму'}
        trigger={trigger}
      />
    </div>
  )
}

export default WalletAmount
