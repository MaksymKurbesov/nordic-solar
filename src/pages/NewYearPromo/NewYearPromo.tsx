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
      {/*<Terms />*/}
      <CTABanner />
      <Faq />
      <p className={styles['disclaimer']}>
        Акция действует с 1 января 2024 года по 31 января 2024 года
        включительно. Размер бонуса составляет до 15% от суммы пополнения.
        Максимальный бонус на одного пользователя ограничен суммой 15 000
        рублей. Бонус начисляется автоматически после успешного пополнения
        личного счета. Минимальная сумма пополнения для участия в акции — 1000
        рублей. Бонус может быть выведен после того, как сумма пополненного
        депозита полностью отработает в рамках инвестиций на платформе. При
        отмене пополнения или попытке нарушения условий акции бонус будет
        аннулирован. Полученный бонус доступен для вывода вместе с доходом после
        завершения всех условий инвестирования. Участник акции обязан соблюдать
        Правила пользования платформой и Политику конфиденциальности, доступные
        по ссылкам на сайте. Организатор акции оставляет за собой право изменять
        условия, сроки проведения или прекращать акцию досрочно без
        предварительного уведомления.
      </p>
    </div>
  )
}

export default NewYearPromo
