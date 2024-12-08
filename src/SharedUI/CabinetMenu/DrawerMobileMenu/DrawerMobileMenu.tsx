import styles from './DrawerMobileMenu.module.scss'
import { Drawer } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { LINKS } from '@SharedUI/CabinetMenu/CabinetMenu.tsx'
import Logo from '@assets/logo.svg?react'
import XIcon from '@assets/icons/x.svg?react'
import { userService } from '@/main.tsx'

const DrawerMobileMenu = ({ open, setOpen }) => {
  return (
    <Drawer
      anchor={'top'}
      open={open}
      onClose={() => setOpen(false)}
      className={styles['drawer']}
    >
      <div className={styles['header']}>
        <Logo width={120} className={styles['logo']} />
        <XIcon onClick={() => setOpen(false)} width={18} />
      </div>
      <ul className={styles['drawer-menu-list']}>
        {LINKS.map((link, index) => {
          return (
            <li key={index}>
              <NavLink
                to={link.link}
                className={({ isActive }) =>
                  isActive ? styles['isActive'] : ''
                }
              >
                {link.icon}
                {link.text}
              </NavLink>
            </li>
          )
        })}
      </ul>
      <button
        onClick={() => {
          userService.logout()
        }}
        className={styles['quit-button']}
      >
        Выйти
      </button>
    </Drawer>
  )
}

export default DrawerMobileMenu
