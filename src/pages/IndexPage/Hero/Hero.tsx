import styles from './Hero.module.scss'
import { CircleButton } from '@SharedUI/CirlceButton/CircleButton.tsx'
import ArrowIcon from '@assets/icons/arrow.svg?react'
import { NavLink } from 'react-router-dom'
import { FC } from 'react'

interface IHeroProps {
  handleScrollDown: () => void
}

const Hero: FC<IHeroProps> = ({ handleScrollDown }) => {
  return (
    <>
      <div className={'container'}>
        <h1 className={styles.title}>
          Инвестируем в <p className={styles['green']}>зеленую</p> энергетику,
          <br />
          <span>создавая чистое и устойчивое будущее</span>
        </h1>
      </div>

      <NavLink target="_blank" to={'/products'}>
        <div className={styles['circle-button']}>
          <CircleButton text={'Наши решения'} cn={'hero-button'} />
        </div>
      </NavLink>
      <p className={styles.subtitle}>
        Эксперты в солнечной энергетике, <br /> и сфере альтернативного питания
      </p>
      <a onClick={() => handleScrollDown()} className={styles.downButton}>
        Вниз
        <ArrowIcon />
      </a>
    </>
  )
}

export default Hero
