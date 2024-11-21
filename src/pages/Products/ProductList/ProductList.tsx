import styles from "./ProductList.module.scss";
import { NavLink } from "react-router-dom";
import SolarEnergy from "@assets/images/products/solar-energy.webp";
import MiningFarm from "@assets/images/products/mining-farm.webp";
import HydrogenTech from "@assets/images/products/hydrogen.webp";
import WindTurbines from "@assets/images/products/wind-turbines.webp";
import Hydroelectric from "@assets/images/products/hydroelectric.webp";
import ArrowButton from "@SharedUI/ArrowButton/ArrowButton.tsx";

const ProductList = () => {
  return (
    <ul className={styles.productsList}>
      <li>
        <NavLink to={"/products/solar-energy"}>
          <img src={SolarEnergy} alt={""} />
          Солнечные фермы
          <div className={styles["arrow-button"]}>
            <ArrowButton />
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink to={"/products/mining-farms"}>
          <img src={MiningFarm} alt={""} />
          Майнинговые фермы
          <div className={styles["arrow-button"]}>
            <ArrowButton />
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink to={"/products/hydrogen-tech"}>
          <img src={HydrogenTech} alt={""} />
          Водородные технологии
          <div className={styles["arrow-button"]}>
            <ArrowButton />
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink to={"/products/wind-turbines"}>
          <img src={WindTurbines} alt={""} />
          Ветровые турбины
          <div className={styles["arrow-button"]}>
            <ArrowButton />
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink to={"/products/hydro-energy"}>
          <img src={Hydroelectric} alt={""} />
          Гидроэлектростанции
          <div className={styles["arrow-button"]}>
            <ArrowButton />
          </div>
        </NavLink>
      </li>
    </ul>
  );
};

export default ProductList;
