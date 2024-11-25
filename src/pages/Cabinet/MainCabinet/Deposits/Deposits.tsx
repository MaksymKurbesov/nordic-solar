import styles from './Deposits.module.scss'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { transformDeposit } from '@/utils/helpers'
import DepositsList from '@/pages/Cabinet/MainCabinet/Deposits/DepositsList/DepositsList.tsx'

const DEPOSIT_COLUMNS = [
  {
    title: 'Вариант',
    key: 'variant',
  },
  {
    title: 'Прогресс',
    key: 'progress',
  },
  {
    title: 'Начисление',
    key: 'nextAccrual',
  },
  {
    title: 'Сумма',
    key: 'amount',
  },
  {
    title: 'Будет получено',
    key: 'willReceived',
  },

  {
    title: 'Получено',
    key: 'received',
  },
  {
    title: 'Способ оплаты',
    key: 'wallet',
  },
  {
    title: 'Дата открытия',
    key: 'openDate',
  },
  {
    title: 'Дата закрытия',
    key: 'closeDate',
  },
]

const Deposits = ({ deposits }) => {
  const modifiedDeposits = deposits.map(transformDeposit)
  const activeDeposits = modifiedDeposits.filter((item) => item.isActive)
  const completedDeposits = modifiedDeposits.filter((item) => !item.isActive)

  return (
    <div className={styles['deposits']}>
      <Tabs defaultFocus>
        <TabList className={styles['deposits-buttons']}>
          <Tab
            className={styles['tab']}
            selectedClassName={styles['selected-tab']}
          >
            Активные депозиты
          </Tab>
          <Tab
            className={styles['tab']}
            selectedClassName={styles['selected-tab']}
          >
            Завершенные депозиты
          </Tab>
        </TabList>

        <TabPanel>
          {activeDeposits.length === 0 ? (
            'У вас нет открытых депозитов'
          ) : (
            <DepositsList
              isActive
              deposits={activeDeposits}
              columns={DEPOSIT_COLUMNS}
            />
          )}
        </TabPanel>
        <TabPanel>
          {completedDeposits.length === 0 ? (
            'У вас нет завершенных депозитов'
          ) : (
            <DepositsList
              deposits={completedDeposits}
              columns={DEPOSIT_COLUMNS}
            />
          )}
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default Deposits
