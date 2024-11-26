import styles from './Documents.module.scss'
import { Button } from '@mui/material'
import { Link, ScrollRestoration } from 'react-router-dom'

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
          <Link to="/nordic-solar-documents.pdf" target="_blank" download>
            <Button variant="contained">Скачать</Button>
          </Link>
        </li>
        <li>
          <p>Сертификаты</p>
          <span>Сертификаты соответствия экологическим стандартам</span>
          <div className={styles['cert-buttons']}>
            <Link to="/ISO14001.pdf" target="_blank" download>
              <Button variant="contained">ISO-14001</Button>
            </Link>
            <Link to="/ISO50001.pdf" target="_blank" download>
              <Button variant="contained">ISO-50001</Button>
            </Link>
            <Link to="/climate-bonds-standart.pdf" target="_blank" download>
              <Button variant="contained">Climate bonds standart</Button>
            </Link>
          </div>
        </li>
      </ul>
      <ScrollRestoration />
    </div>
  )
}

export default Documents
