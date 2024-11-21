import styles from './Investments.module.scss'
import Individual from '@assets/images/investments/individual.webp'
import MutualFonds from '@assets/images/investments/mutual-fonds.webp'
import Crowdfounding from '@assets/images/investments/crowdfunding.webp'
import Pension from '@assets/images/investments/pension.webp'
import ArrowButton from '@SharedUI/ArrowButton/ArrowButton.tsx'
import Instruction from '@/pages/Investments/Instruction/Instruction.tsx'
import ContactUs from '@SharedUI/ContactUs/ContactUs.tsx'
import { NavLink, ScrollRestoration } from 'react-router-dom'

const PLANS = [
  {
    link: 'individual-investment-plans',
    image: Individual,
    name: 'Индивидуальные инвестиционные планы',
    description:
      'Индивидуальные планы, разработанные с учетом ваших целей и потребностей. Получите персонализированное управление портфелем, индивидуальные консультации и регулярные отчеты',
  },
  {
    link: 'mutual-fonds',
    image: MutualFonds,
    name: 'Взаимные фонды зеленой энергетики',
    description:
      'Инвестируйте в диверсифицированные фонды, включающие проекты в солнечной, ветровой, гидроэнергетике и водородных технологиях. Диверсификация снижает риски, а профессиональное управление активами обеспечивает стабильный доход',
  },
  {
    link: 'crowdfunding-investment-programs',
    image: Crowdfounding,
    name: 'Программы коллективных инвестиций (Crowdfunding)',
    description:
      'Платформа для коллективных инвестиций, позволяющая частным лицам объединять средства для финансирования проектов зеленой энергетики. Доступные пороги входа, прозрачность и регулярные отчеты',
  },
  {
    link: 'pension-investment-plans',
    image: Pension,
    name: 'Пенсионные инвестиционные планы',
    description:
      'Долгосрочные планы для накопления пенсионных средств. Стабильный доход, минимальные риски и регулярные выплаты обеспечат надежное будущее',
  },
]

const Investments = () => {
  return (
    <div className={`${styles['investments']} container`}>
      <h2 className={'page-title'}>Инвестиции</h2>
      <p className={styles['subtitle']}>
        Мы готовы представить разные планы инвестирования для различных
        требований
      </p>
      <ul className={styles['plans-list']}>
        {PLANS.map((plan) => {
          return (
            <li key={plan.name}>
              <NavLink to={`/investments/${plan.link}`}>
                <img src={plan.image} alt={''} />
                <div className={styles['info']}>
                  <h3>{plan.name}</h3>
                  <p>{plan.description}</p>
                </div>

                <ArrowButton />
              </NavLink>
            </li>
          )
        })}
      </ul>
      <Instruction />
      <ContactUs />
      <ScrollRestoration />
    </div>
  )
}

export default Investments
