import styles from './NewYearPromo.module.scss'
import WhyParticipate from '@/pages/NewYearPromo/WhyParticipate/WhyParticipate.tsx'
import Instruction from '@/pages/NewYearPromo/Instruction/Instruction.tsx'
import Calculator from '@/pages/NewYearPromo/Calculator/Calculator.tsx'
import Terms from '@/pages/NewYearPromo/Terms/Terms.tsx'
import CTABanner from '@/pages/NewYearPromo/CTABanner/CTABanner.tsx'
import Faq from '@/pages/NewYearPromo/FAQ/FAQ.tsx'

const NewYearPromo = () => {
  return (
    <div className={`${styles['new-year-promo']} container`}>
      <div className={styles['header']}>
        <h1>
          Новогодний бонус до <span>+15%</span> <br /> при пополнении счета!
        </h1>
        <p>
          Начните 2025 с выгодой — инвестируйте в зеленую энергетику и получайте
          дополнительный доход.
        </p>
        <button>Пополнить счет и получить бонус</button>
      </div>
      <WhyParticipate />
      <Instruction />
      <Calculator />
      <Terms />
      <CTABanner />
      <Faq />
    </div>
  )
}

export default NewYearPromo
