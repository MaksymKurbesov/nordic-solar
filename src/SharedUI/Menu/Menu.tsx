import Logo from '@assets/logo.svg?react'
import styles from './Menu.module.scss'
import { NavLink } from 'react-router-dom'
import useIsHomePage from '@/hooks/useIsHomePage.ts'

const Menu = () => {
  const isHomePage = useIsHomePage()

  return (
    <div
      className={`${styles.menu} ${isHomePage ? styles.menuIndex : ''} container`}
    >
      <NavLink className={styles['logotype']} to={'/'}>
        <Logo width={120} />
      </NavLink>
      <nav className={styles.navigation}>
        <ul className={styles['navigation-list']}>
          <li>
            <NavLink
              to={'/products'}
              className={({ isActive, isPending }) =>
                isPending ? styles['pending'] : isActive ? styles['active'] : ''
              }
            >
              Продукты
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/investments'}
              className={({ isActive, isPending }) =>
                isPending ? styles['pending'] : isActive ? styles['active'] : ''
              }
            >
              Инвестиции
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/partner-program'}
              className={({ isActive, isPending }) =>
                isPending ? styles['pending'] : isActive ? styles['active'] : ''
              }
            >
              Партнёрская программа
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/about-us'}
              className={({ isActive, isPending }) =>
                isPending ? styles['pending'] : isActive ? styles['active'] : ''
              }
            >
              О нас
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/faq'}
              className={({ isActive, isPending }) =>
                isPending ? styles['pending'] : isActive ? styles['active'] : ''
              }
            >
              FAQ
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/contacts'}
              className={({ isActive, isPending }) =>
                isPending ? styles['pending'] : isActive ? styles['active'] : ''
              }
            >
              Контакты
            </NavLink>
          </li>
        </ul>
      </nav>
      <NavLink to={'/sign-in'} className={styles.signInButton}>
        Войти
      </NavLink>
      <NavLink to={'/contacts'}>
        <button className={styles.contactUsButton}>Связаться с нами</button>
      </NavLink>
    </div>
  )
}

export default Menu
