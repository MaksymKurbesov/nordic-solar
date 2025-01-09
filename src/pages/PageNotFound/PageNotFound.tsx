import styles from './PageNotFound.module.scss'
import { useNavigate } from 'react-router-dom'
import Logo from '@assets/logo.svg?react'

const PageNotFound = () => {
  const navigate = useNavigate()

  return (
    <div className={styles['page-not-found-wrapper']}>
      <div className={styles['page-not-found']}>
        <Logo width={100} />
        <h1>404</h1>
        <p>
          Страница, которую вы ищете, могла быть удалена, изменить название или
          временно недоступна
        </p>
        <button
          onClick={() => {
            navigate('/')
          }}
        >
          Перейти на главную
        </button>
      </div>
    </div>
  )
}

export default PageNotFound
