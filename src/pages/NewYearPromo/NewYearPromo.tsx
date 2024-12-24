import styles from './NewYearPromo.module.scss'
import WhyParticipate from '@/pages/NewYearPromo/WhyParticipate/WhyParticipate.tsx'
import Instruction from '@/pages/NewYearPromo/Instruction/Instruction.tsx'
import Calculator from '@/pages/NewYearPromo/Calculator/Calculator.tsx'
import Terms from '@/pages/NewYearPromo/Terms/Terms.tsx'
import CTABanner from '@/pages/NewYearPromo/CTABanner/CTABanner.tsx'
import Faq from '@/pages/NewYearPromo/FAQ/FAQ.tsx'
import { useUser } from '@/hooks/useUser.ts'
import { useEffect, useState } from 'react'
import { useAuthState } from '@/hooks/useAuthState.ts'
import { auth, userService } from '@/main.tsx'
import { useNavigate } from 'react-router-dom'

const NewYearPromo = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState()
  const [firebaseUser, userLoading] = useAuthState(auth, {
    onUserChanged: true,
  })

  useEffect(() => {
    if (!firebaseUser) return

    const userNickname = firebaseUser.displayName

    const fetchUserData = async () => {
      const userData = await userService.getUser(userNickname)
      setUser(userData)
    }

    fetchUserData()
  }, [firebaseUser])

  const clickHeroButtonHandler = () => {
    if (user) {
      navigate('/cabinet/make-deposit')
    } else {
      navigate('/sign-in')
    }
  }

  return (
    <div className={styles['new-year-promo-wrapper']}>
      <div className={styles['header']}>
        <h1>
          Новогодний бонус до <span>+15%</span> <br /> при пополнении счета!
        </h1>
        <p>
          Начните 2025 с выгодой — инвестируйте в зеленую энергетику и получайте
          дополнительный доход.
        </p>
        <button onClick={clickHeroButtonHandler}>
          Пополнить счет и получить бонус
        </button>
      </div>
      <div className={`${styles['new-year-promo']} container`}>
        <WhyParticipate />
        <Instruction />
        <Calculator />
        {/*<Terms />*/}
        <CTABanner user={user} />
        <Faq />
        <p className={styles['disclaimer']}>
          Акция действует с 16 декабря 2024 года по 10 января 2025 года
          включительно. Размер бонуса составляет 15% от суммы пополнения.
          Максимальный бонус на одного пользователя неограничен. Бонус
          начисляется автоматически после успешного пополнения личного счета с
          указанием промокода. Минимальная сумма пополнения для участия в акции
          — 50$. Бонус может быть выведен после того, как сумма пополненного
          депозита полностью отработает в рамках инвестиций на платформе. При
          отмене пополнения или попытке нарушения условий акции бонус будет
          аннулирован. Полученный бонус доступен для вывода вместе с доходом
          после завершения всех условий инвестирования. Участник акции обязан
          соблюдать Правила пользования платформой и Политику
          конфиденциальности, доступные по ссылкам на сайте. Организатор акции
          оставляет за собой право изменять условия, сроки проведения или
          прекращать акцию досрочно без предварительного уведомления.
        </p>
        {/*<snow-effect color="white" flakes="50" speed="1" />*/}
      </div>
    </div>
  )
}

export default NewYearPromo
