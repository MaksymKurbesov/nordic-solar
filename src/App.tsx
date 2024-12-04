import Menu from '@SharedUI/Menu/Menu.tsx'
import { Outlet } from 'react-router-dom'
import Footer from '@SharedUI/Footer/Footer.tsx'
import 'react-tabs/style/react-tabs.css'
import MobileMenu from '@SharedUI/Menu/MobileMenu.tsx'
import { Toaster } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { useUser } from '@/hooks/useUser.ts'
import { auth, depositService, userService, walletsService } from '@/main.tsx'
import { useAuthState } from '@/hooks/useAuthState.ts'

function App() {
  return (
    <>
      <Menu />
      <Outlet />
      <Footer isFullFooter />
      <MobileMenu />
      <Toaster />
    </>
  )
}

export default App
