import Hero from '@/pages/IndexPage/Hero/Hero.tsx'
import styles from './IndexPage.module.scss'
import WeBelieve from '@/pages/IndexPage/WeBelieve/WeBelieve.tsx'
import Features from '@/SharedUI/Features/Features.tsx'
import Advantages from '@/pages/IndexPage/Advantages/Advantages.tsx'
import OfferBanner from '@/pages/IndexPage/OfferBanner/OfferBanner.tsx'
import Roadmap from '@/pages/IndexPage/Roadmap/Roadmap.tsx'
import ContactUs from '@SharedUI/ContactUs/ContactUs.tsx'
import Partners from '@/pages/IndexPage/Partners/Partners.tsx'
import MobileFeatures from '@/SharedUI/Features/MobileFeatures.tsx'
import useWindowSize from '@/hooks/useWindowSize.ts'
import Image1 from '@assets/images/features-image1.webp'
import Image2 from '@assets/images/features-image2.webp'
import Image3 from '@assets/images/features-image3.webp'
import Image4 from '@assets/images/features-image4.webp'
import { useRef } from 'react'

const FEATURES = [
  {
    title: 'Финансирование проектов',
    description: [
      'Прямые инвестиции в проекты по возобновляемым источникам энергии',
      'Поддержка стартапов и инновационных технологий в сфере зеленой энергетики.',
      'Помощь в привлечении внешнего финансирования и грантов.',
    ],
    image: Image1,
  },
  {
    title: 'Консультации и анализ',
    description: [
      'Анализ рынка зеленой энергетики и оценка перспективных проектов.',
      'Консультации по инвестиционным стратегиям и выбору оптимальных проектов для вложений.',
    ],
    image: Image2,
  },
  {
    title: 'Управление проектами',
    description: [
      'Полный цикл управления проектами от начальной идеи до завершения строительства и ввода в эксплуатацию',
      'Мониторинг и отчетность по ходу выполнения проектов.',
      'Обеспечение соответствия проектов экологическим и регуляторным требованиям.',
    ],
    image: Image3,
  },
  {
    title: 'Разработка решений',
    description: [
      'Исследования и разработки новых технологий в области возобновляемой энергии.',
      'Консультации по внедрению энергоэффективных решений и снижению углеродного следа.',
    ],
    image: Image4,
  },
]

const IMAGES = [Image1, Image2, Image3, Image4]

const IndexPage = () => {
  const windowSize = useWindowSize()
  const isMobile = windowSize.width < 900

  const scrollableRef = useRef(null)

  const handleScrollDown = () => {
    if (scrollableRef.current) {
      console.log(scrollableRef.current.clientHeight, 'scrollableRef.current')
      window.scrollTo({
        top: scrollableRef.current.scrollHeight,
        behavior: 'smooth', // Для плавной прокрутки
      })
    }
  }

  return (
    <>
      <div className={styles.heroContainer} ref={scrollableRef}>
        <Hero handleScrollDown={handleScrollDown} />
      </div>
      <div className={'container'}>
        <WeBelieve />
        {isMobile ? (
          <MobileFeatures features={FEATURES} />
        ) : (
          <Features features={FEATURES} images={IMAGES} />
        )}
        <Advantages />
        <OfferBanner />
        <Roadmap />
        <ContactUs />
        <Partners />
      </div>
    </>
  )
}

export default IndexPage
