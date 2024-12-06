import Logo from '@assets/logo.svg?react'
import styles from './CabinetMenu.module.scss'
import { NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import UserAvatar from '@assets/images/user.png'

import { userService } from '@/main.tsx'
import { useUser } from '@/hooks/useUser.ts'
import MenuStatistic from '@SharedUI/CabinetMenu/MenuStatistic/MenuStatistic.tsx'
import useIsHomePage from '@/hooks/useIsHomePage.ts'

export const LINKS = [
  {
    text: 'Кабинет',
    link: '/cabinet/main',
  },
  {
    text: 'Открыть план',
    link: '/cabinet/open-plan/plans',
  },
  {
    text: 'Пополнить счет',
    link: '/cabinet/make-deposit',
  },
  {
    text: 'Вывод средств',
    link: '/cabinet/withdrawn',
  },
  {
    text: 'Транзакции',
    link: '/cabinet/transactions',
  },
  {
    text: 'Рефералы',
    link: '/cabinet/referrals',
  },
]

const Menu = () => {
  const isHomePage = useIsHomePage()
  const { user } = useUser()

  if (!user) return null

  return (
    <div className={`${styles.menu} ${isHomePage ? styles['menuIndex'] : ''}`}>
      <div className={styles['top-row']}>
        <NavLink to={'/'} className={styles['logotype']}>
          <Logo width={120} />
        </NavLink>
        <nav className={styles.navigation}>
          <ul>
            {LINKS.map((item) => {
              return (
                <li key={item.link}>
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isPending
                        ? styles['pending']
                        : isActive
                          ? styles['active']
                          : ''
                    }
                    to={item.link}
                  >
                    {item.text}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className={styles['user']}>
          <img src={UserAvatar} alt={''} />
          <div className={styles['user-wrapper']}>
            <p>{user.nickname}</p>
            <NavLink to={'/cabinet/settings'}>Настройки</NavLink>
          </div>
        </div>
        <button
          onClick={() => {
            userService.logout()
          }}
          className={styles['quit-button']}
        >
          Выйти
        </button>
      </div>
      <MenuStatistic />
    </div>
  )
}

export default Menu
