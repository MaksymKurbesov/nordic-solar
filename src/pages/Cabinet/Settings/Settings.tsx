import styles from './Settings.module.scss'
import Input from '@SharedUI/Input/Input.tsx'
import WideButton from '@SharedUI/WideButton/WideButton.tsx'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { FormProvider, useForm } from 'react-hook-form'
import { useUser } from '@/hooks/useUser.ts'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { userService } from '@/main.tsx'
import Personal from '@/pages/Cabinet/Settings/Personal/Personal.tsx'
import { ScrollRestoration } from 'react-router-dom'

const TABS = ['personal', 'wallets', 'password', 'safe']

const Settings = () => {
  const { user } = useUser()
  const [currentTab, setCurrentTab] = useState('personal')

  const form = useForm({
    defaultValues: {
      email: '',
    },
    values: {
      email: user?.email,
      name: user?.settings.name,
      surname: user?.settings.surname,
      phone: user?.settings.phone,
      social: user?.settings.social,
      country: user?.settings.country,
      trc20: user?.wallets.trc20.number,
      ton: user?.wallets.ton.number,
      bitcoin: user?.wallets.bitcoin.number,
      ethereum: user?.wallets.ethereum.number,
      solana: user?.wallets?.solana?.number,
    },
    mode: 'onChange',
  })

  const submitSettings = async () => {
    if (!user) return

    if (currentTab === 'personal') {
      const fields = ['name', 'surname', 'phone', 'social', 'country']
      const updates = {}

      // Собираем только измененные поля
      fields.forEach((field) => {
        const newValue = form.watch(field)
        if (user.settings[field] !== newValue) {
          updates[`settings.${field}`] = newValue
        }
      })

      // Обновляем данные одним запросом
      if (Object.keys(updates).length > 0) {
        await userService.updateUser(user.nickname, updates)
      }
    }

    if (currentTab === 'wallets') {
      const walletKeys = ['bitcoin', 'ethereum', 'ton', 'trc20', 'solana'] // Ключи кошельков
      const updates = {}

      walletKeys.forEach((key) => {
        const newWalletNumber = form.watch(key)
        if (user.wallets[key]?.number !== newWalletNumber) {
          updates[`wallets.${key}.number`] = newWalletNumber
        }
      })

      try {
        // Обновляем все измененные кошельки одним запросом
        await userService.updateUser(user.nickname, updates)
      } catch (error) {
        console.error('Ошибка обновления данных кошельков:', error)
        toast.error('Не удалось обновить данные кошельков')
      }
    }

    toast.success('Настройки сохранены')

    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  if (!user) return

  return (
    <div className={styles['settings']}>
      <FormProvider {...form}>
        <h3>Мои настройки</h3>
        <Tabs
          focusTabOnClick={false}
          onSelect={(index) => setCurrentTab(TABS[index])}
        >
          <div className={styles['tab-list-wrapper']}>
            <TabList className={styles['tab-list']}>
              <Tab
                className={styles['tab']}
                selectedClassName={styles['selected-tab']}
              >
                Личная информация
              </Tab>
              <Tab
                className={styles['tab']}
                selectedClassName={styles['selected-tab']}
              >
                Платежные данные
              </Tab>
              <Tab
                className={styles['tab']}
                selectedClassName={styles['selected-tab']}
              >
                Пароль
              </Tab>
              <Tab
                className={styles['tab']}
                selectedClassName={styles['selected-tab']}
              >
                Безопасность
              </Tab>
            </TabList>
          </div>

          <TabPanel>
            <Personal />
          </TabPanel>
          <TabPanel>
            <div className={styles['inputs']}>
              <Input
                label={'TRC20 Tether'}
                name={'trc20'}
                placeholder={'TBia4uHnb3oSSZm5isP284cA7Np1v15Vhi'}
                register={form.register}
                trigger={form.trigger}
              />
              <Input
                label={'TON'}
                name={'ton'}
                placeholder={'EQC9pbhSTfnA6d3nuJReYXFSOLHGcHaiPRtBtwJBoJlUv3r'}
                register={form.register}
                trigger={form.trigger}
              />
              <Input
                label={'Bitcoin'}
                name={'bitcoin'}
                placeholder={'3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5'}
                register={form.register}
                trigger={form.trigger}
              />
              <Input
                label={'Ethereum'}
                name={'ethereum'}
                placeholder={'0x71C7656EC7ab88b098defB751B7401B5f6d8976F'}
                register={form.register}
                trigger={form.trigger}
              />
              <Input
                label={'Solana'}
                name={'solana'}
                placeholder={'7EcDhSYGxXyscszYEp35KHN8vvw3svAuLKTzXwCFLtV'}
                register={form.register}
                trigger={form.trigger}
              />
            </div>
          </TabPanel>
          <TabPanel>
            <div className={styles['inputs']}>
              <Input label={'Старый пароль'} name={'old-password'} />
              <Input label={'Новый пароль'} name={'new-password'} />
              <Input label={'Повторить пароль'} name={'confirm-password'} />
            </div>
          </TabPanel>
          <TabPanel>
            <div className={styles['safe-inputs']}>
              <Input label={'Ваш часовой пояс (от UTC)'} name={'utc-time'} />
              <Input label={'IP-контроль'} name={'ip-control'} />
              <Input label={'Выход из системы через'} name={'exit'} />
              <Input label={'Введите код из GA'} name={'ga'} />
            </div>
          </TabPanel>
        </Tabs>
        <WideButton
          text={'Сохранить настройки'}
          isCheckButton
          onClickHandler={submitSettings}
        />
      </FormProvider>
      <ScrollRestoration />
    </div>
  )
}

export default Settings
