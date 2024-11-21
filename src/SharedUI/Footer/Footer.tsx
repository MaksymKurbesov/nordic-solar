import styles from './Footer.module.scss'
import Logo from '@assets/logo.svg?react'
import { CircleButton } from '../CirlceButton/CircleButton.tsx'

const Footer = ({ isFullFooter }) => {
  return (
    <div className={`${styles.footer} container`}>
      {isFullFooter && (
        <div className={styles.topFooter}>
          <Logo className={styles.logo} width={250} />
          <div className={styles.contacts}>
            <a href={'#'}>+47 24 06 7003</a>
            <a href={'#'}>support@nordic-solar.tech</a>
          </div>
          <div className={styles.circleButton}>
            <CircleButton text={'Связаться с нами'} cn={'white-button'} />
          </div>
        </div>
      )}
      <div className={styles.bottomFooter}>
        <div className={styles.copyright}>
          <p>
            Эксперты в солнечной энергетике, <br />и сфере альтернативного
            питания
          </p>
          <p className={styles['copyright-text']}>
            Copyright © Nordic Solutions 2024
          </p>
        </div>
        <nav>
          <h3>Навигация</h3>
          <ul>
            <li>
              <a href={'#'}>Продукты</a>
            </li>
            <li>
              <a href={'#'}>Инвестиции</a>
            </li>
            <li>
              <a href={'#'}>О нас</a>
            </li>
            <li>
              <a href={'#'}>FAQ</a>
            </li>
            <li>
              <a href={'#'}>Контакты</a>
            </li>
          </ul>
        </nav>
        <nav>
          <h3>Мы в соцсетях</h3>
          <ul>
            <li>
              <a href={'#'}>Facebook</a>
            </li>
            <li>
              <a href={'#'}>Twitter</a>
            </li>
            <li>
              <a href={'#'}>Linkedin</a>
            </li>
          </ul>
        </nav>
        <div className={styles.office}>
          <h3>Офис</h3>
          <p>
            Norway <br /> Oslo, Lilleakerveien 14 P.O Box 200 Lilleaker <br />{' '}
            NO-0216
          </p>
        </div>
        <p className={styles['mobile-copyright-text']}>
          Copyright © Nordic Solutions {new Date().getFullYear()}
        </p>
      </div>
    </div>
  )
}

export default Footer
