import styles from './Documents.module.scss'
import { Button } from '@mui/material'
import { ScrollRestoration } from 'react-router-dom'

const Documents = () => {
  return (
    <div className={`${styles['documents']} container`}>
      <h1>Документы</h1>
      <p className={styles['subtitle']}>
        Пожалуйста, внимательно ознакомтесь с документами компании.
      </p>
      <ul className={styles['documents-list']}>
        <li>
          <p>Organisasjonsnummer</p>
          <span>
            Регистрация компании в Бруннёйсундетском регистре
            (Brønnøysundregistrene).
          </span>
          <Button variant="contained">Скачать</Button>
        </li>
        <li>
          <p>Сертификаты</p>
          <span>Сертификаты соответствия экологическим стандартам</span>
          <Button variant="contained">Скачать</Button>
        </li>
      </ul>
      <ScrollRestoration />
    </div>
  )
}

export default Documents
