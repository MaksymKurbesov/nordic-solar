import styles from "./ProductList.module.scss";
import { NavLink } from "react-router-dom";
import SolarEnergy from "@assets/images/products/solar-energy.webp";
import MiningFarm from "@assets/images/products/mining-farm.webp";
import HydrogenTech from "@assets/images/products/hydrogen.webp";
import WindTurbines from "@assets/images/products/wind-turbines.webp";
import Hydroelectric from "@assets/images/products/hydroelectric.webp";
import ArrowButton from "@SharedUI/ArrowButton/ArrowButton.tsx";
import SuspenseImage from "@/utils/SuspenseImage.tsx";
import { useTranslation } from "react-i18next";

const ProductList = () => {
  const { t } = useTranslation("products");

  return (
    <ul className={styles.productsList}>
      <li>
        <NavLink to={"/products/solar-energy"}>
          <SuspenseImage src={SolarEnergy} />
          {t("solar")}
          <div className={styles["arrow-button"]}>
            <ArrowButton />
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink to={"/products/mining-farms"}>
          <SuspenseImage src={MiningFarm} />
          {t("mining")}
          <div className={styles["arrow-button"]}>
            <ArrowButton />
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink to={"/products/hydrogen-tech"}>
          <SuspenseImage src={HydrogenTech} />
          {t("hydrogen")}
          <div className={styles["arrow-button"]}>
            <ArrowButton />
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink to={"/products/wind-turbines"}>
          <SuspenseImage src={WindTurbines} />
          {t("wind")}
          <div className={styles["arrow-button"]}>
            <ArrowButton />
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink to={"/products/hydro-energy"}>
          <SuspenseImage src={Hydroelectric} />
          {t("hydro")}
          <div className={styles["arrow-button"]}>
            <ArrowButton />
          </div>
        </NavLink>
      </li>
    </ul>
  );
};

export default ProductList;
