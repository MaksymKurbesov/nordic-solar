import styles from './CabinetLayout.module.scss'
import { Outlet } from 'react-router-dom'
import Footer from '@SharedUI/Footer/Footer.tsx'
import CabinetMenu from '@SharedUI/CabinetMenu/CabinetMenu.tsx'
import MobileCabinetMenu from '@SharedUI/CabinetMenu/MobileCabinetMenu'
import { Toaster } from 'react-hot-toast'

const CabinetLayout = () => {
  return (
    <div className={styles['cabinet']}>
      <CabinetMenu />
      <div className={'container'}>
        <Outlet />
      </div>
      <Footer />
      <MobileCabinetMenu />
      <Toaster />
    </div>
  )
}

export default CabinetLayout
