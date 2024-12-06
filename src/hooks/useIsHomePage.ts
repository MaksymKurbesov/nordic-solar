import { useLocation } from 'react-router-dom'
import { useMemo } from 'react'

function useIsHomePage() {
  const location = useLocation()

  return useMemo(() => location.pathname === '/', [location.pathname])
}

export default useIsHomePage
