import styles from './DrawerMobileMenu.module.scss'
import { Drawer } from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'
import { LINKS } from '@SharedUI/CabinetMenu/CabinetMenu.tsx'
import Logo from '@assets/logo.svg?react'
import XIcon from '@assets/icons/x.svg?react'
import { userService } from '@/main.tsx'
import { Dispatch, FC, ReactElement, SetStateAction } from 'react'

interface IDrawerMobileMenuProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export interface ILink {
  link: string
  text: string
  icon: ReactElement
}

const DrawerMobileMenu: FC<IDrawerMobileMenuProps> = ({ open, setOpen }) => {
  const navigate = useNavigate()

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
        {LINKS.map((link: ILink, index: number) => {
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
        onClick={async () => {
          await userService.logout()
          navigate('/')
        }}
        className={styles['quit-button']}
      >
        Выйти
      </button>
    </Drawer>
  )
}

export default DrawerMobileMenu
