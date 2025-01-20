import styles from './Footer.module.scss'
import Logo from '@assets/logo.svg?react'
import { CircleButton } from '../CirlceButton/CircleButton.tsx'
import { NavLink } from 'react-router-dom'

const Footer = ({ isFullFooter }: { isFullFooter?: boolean }) => {
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
              <NavLink to={'/products'}>Продукты</NavLink>
            </li>
            <li>
              <NavLink to={'/investments'}>Инвестиции</NavLink>
            </li>
            <li>
              <NavLink to={'/partner-program'}>Партнёрская программа</NavLink>
            </li>
            <li>
              <NavLink to={'/about-us'}>О нас</NavLink>
            </li>
            <li>
              <NavLink to={'/faq'}>FAQ</NavLink>
            </li>
            <li>
              <NavLink to={'/contacts'}>Контакты</NavLink>
            </li>
            <li>
              <NavLink to={'/company-documents'}>Документы компании</NavLink>
            </li>
            <li>
              <NavLink to={'/privacy-policy'}>
                Политика конфиденциальности
              </NavLink>
            </li>
            <li>
              <NavLink to={'/terms-of-use'}>Условия эксплуатации</NavLink>
            </li>
          </ul>
        </nav>
        <nav>
          <h3>Мы в соцсетях</h3>
          <ul>
            <li>
              <a
                href={'https://www.instagram.com/nordic.solar_official/'}
                target={'_blank'}
              >
                Instagram
              </a>
            </li>
            <li>
              <a href={'https://t.me/nordic_solar_news'} target={'_blank'}>
                Telegram
              </a>
            </li>
            <li>
              <a href={'https://x.com/nordic_solar'}>X (twitter)</a>
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
