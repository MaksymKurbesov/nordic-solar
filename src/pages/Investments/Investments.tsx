import styles from './Investments.module.scss'
import SolarFuture from '@assets/images/investments/solar-future.webp'
import WindProsperity from '@assets/images/investments/wind-prosperity.webp'
import HydroPowerEdge from '@assets/images/investments/hydro.webp'
import Hydrogen from '@assets/images/investments/hydrogen.webp'
import Mining from '@assets/images/investments/mining-farm.webp'
import ArrowButton from '@SharedUI/ArrowButton/ArrowButton.tsx'
import Instruction from '@/pages/Investments/Instruction/Instruction.tsx'
import ContactUs from '@SharedUI/ContactUs/ContactUs.tsx'
import { NavLink, ScrollRestoration } from 'react-router-dom'

const PLANS = [
  {
    link: 'solar-future',
    image: SolarFuture,
    name: 'Solar Future',
    description:
      'Перспективные проекты и инвестиционные решения в области солнечной энергетики, направленные на использование возобновляемых источников энергии для устойчивого будущего.',
  },
  {
    link: 'wind-prosperity',
    image: WindProsperity,
    name: 'Wind Prosperity',
    description:
      'Разработка и реализация комплексных планов для создания эффективных ветроэнергетических установок, обеспечивающих надежное и экологичное энергоснабжение.',
  },
  {
    link: 'hydro-poweredge',
    image: HydroPowerEdge,
    name: 'Hydro PowerEdge',
    description:
      'Программы по развитию гидроэлектростанций с применением передовых технологий, ориентированные на повышение производительности и снижение экологического воздействия.',
  },
  {
    link: 'hydrogen-horizons',
    image: Hydrogen,
    name: 'Hydrogen Horizons',
    description:
      'Инвестиции и проекты в области водородной энергетики, включая технологии производства, хранения и добычи водорода для перехода на экологически чистую энергетику.',
  },
  {
    link: 'mining-farms',
    image: Mining,
    name: 'Mining Farms',
    description:
      'Проекты и инвестиции в майнинговые фермы, направленные на разработку, оптимизацию и масштабирование оборудования для эффективной добычи криптовалют и получения стабильной прибыли.',
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
