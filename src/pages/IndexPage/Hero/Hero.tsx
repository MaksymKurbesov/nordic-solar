import styles from './Hero.module.scss'

import { CircleButton } from '@SharedUI/CirlceButton/CircleButton.tsx'
import ArrowIcon from '@assets/icons/arrow.svg?react'
import { NavLink } from 'react-router-dom'
import { useRef } from 'react'

const Hero = () => {
  const scrollableRef = useRef(null)

  const handleScrollDown = () => {
    if (scrollableRef.current) {
      console.log(scrollableRef, 'scrollableRef')
      console.log(scrollableRef.current, 'scrollableRef.current')
      window.scrollTo({
        top: scrollableRef.current.scrollHeight,
        behavior: 'smooth', // Для плавной прокрутки
      })
    }
  }

  return (
    <>
      <div className={'container'} ref={scrollableRef}>
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
