import styles from './Partners.module.scss'
import BaywareIcon from '@assets/images/partners/bayware.png'
import EdfIcon from '@assets/images/partners/edf.svg'
import EnelIcon from '@assets/images/partners/enel.png'
import IberdrolaIcon from '@assets/images/partners/iberdrola.svg'
import OrstedIcon from '@assets/images/partners/orsted.svg'
import ScatedIcon from '@assets/images/partners/scatec.svg'

const Partners = () => {
  return (
    <div className={`${styles.partners}`}>
      <div className={styles.text}>
        <h3>
          Наши решения{' '}
          <span>
            воплощены <br /> во многих <br />{' '}
          </span>
          крупных компаниях
        </h3>
        <div className={styles.bottomText}>
          <h4>Мы работаем с лучшими</h4>
          <p>
            Наши решения представлены в 30 странах мира: от Австралии до
            Мексики, от Африки до Тайланда. Нам доверяют, нас ценят.
          </p>
        </div>
      </div>
      <div className={styles.logoWrapper}>
        <img src={BaywareIcon} alt={''} width={'100%'} />
      </div>
      <div className={styles.logoWrapper}>
        <img src={EdfIcon} alt={''} width={'100%'} />
      </div>
      <div className={styles.logoWrapper}>
        <img src={EnelIcon} alt={''} width={'100%'} />
      </div>
      <div className={styles.logoWrapper}>
        <img src={IberdrolaIcon} alt={''} width={'100%'} />
      </div>
      <div className={styles.logoWrapper}>
        <img src={OrstedIcon} alt={''} width={'100%'} />
      </div>
      <div className={styles.logoWrapper}>
        <img src={ScatedIcon} alt={''} width={'100%'} />
      </div>
      <div className={styles['mobile-bottom-text']}>
        <h4>Мы работаем с лучшими</h4>
        <p>
          Наши решения представлены в 30 странах мира: от Австралии до Мексики,
          от Африки до Тайланда. Нам доверяют, нас ценят.
        </p>
      </div>
    </div>
  )
}

export default Partners
