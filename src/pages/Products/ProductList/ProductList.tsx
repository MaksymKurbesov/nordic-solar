import styles from './ProductList.module.scss'
import { NavLink } from 'react-router-dom'
import SolarEnergy from '@assets/images/products/solar-energy.webp'
import MiningFarm from '@assets/images/products/mining-farm.webp'
import HydrogenTech from '@assets/images/products/hydrogen.webp'
import WindTurbines from '@assets/images/products/wind-turbines.webp'
import Hydroelectric from '@assets/images/products/hydroelectric.webp'
import ArrowButton from '@SharedUI/ArrowButton/ArrowButton.tsx'
import SuspenseImage from '@/utils/SuspenseImage.tsx'

const ProductList = () => {
  return (
    <ul className={styles.productsList}>
      <li>
        <NavLink to={'/products/solar-energy'}>
          <SuspenseImage src={SolarEnergy} />
          Солнечные фермы
          <div className={styles['arrow-button']}>
            <ArrowButton />
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink to={'/products/mining-farms'}>
          {/*<img src={MiningFarm} alt={''} />*/}
          <SuspenseImage src={MiningFarm} />
          Майнинговые фермы
          <div className={styles['arrow-button']}>
            <ArrowButton />
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink to={'/products/hydrogen-tech'}>
          {/*<img src={HydrogenTech} alt={''} />*/}
          <SuspenseImage src={HydrogenTech} />
          Водородные технологии
          <div className={styles['arrow-button']}>
            <ArrowButton />
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink to={'/products/wind-turbines'}>
          {/*<img src={WindTurbines} alt={''} />*/}
          <SuspenseImage src={WindTurbines} />
          Ветровые турбины
          <div className={styles['arrow-button']}>
            <ArrowButton />
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink to={'/products/hydro-energy'}>
          {/*<img src={Hydroelectric} alt={''} />*/}
          <SuspenseImage src={Hydroelectric} />
          Гидроэлектростанции
          <div className={styles['arrow-button']}>
            <ArrowButton />
          </div>
        </NavLink>
      </li>
    </ul>
  )
}

export default ProductList
