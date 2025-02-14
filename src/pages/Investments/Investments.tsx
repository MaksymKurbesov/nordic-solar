import styles from "./Investments.module.scss";
import SolarFuture from "@assets/images/investments/solar-future.webp";
import WindProsperity from "@assets/images/investments/wind-prosperity.webp";
import HydroPowerEdge from "@assets/images/investments/hydro.webp";
import Hydrogen from "@assets/images/investments/hydrogen.webp";
import Mining from "@assets/images/investments/mining-farm.webp";
import ArrowButton from "@SharedUI/ArrowButton/ArrowButton.tsx";
import Instruction from "@/pages/Investments/Instruction/Instruction.tsx";
import ContactUs from "@SharedUI/ContactUs/ContactUs.tsx";
import { NavLink, ScrollRestoration } from "react-router-dom";
import SuspenseImage from "@/utils/SuspenseImage.tsx";
import { useTranslation } from "react-i18next";
import CalculatorIcon from "@assets/icons/calculator.png";
import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Calculator from "@SharedUI/Calculator/Calculator.tsx";

const getPlans = (t) => {
  return [
    {
      link: "solar-future",
      image: SolarFuture,
      name: "Solar Future",
      description: t("solar_descr"),
    },
    {
      link: "wind-prosperity",
      image: WindProsperity,
      name: "Wind Prosperity",
      description: t("wind_descr"),
    },
    {
      link: "hydro-poweredge",
      image: HydroPowerEdge,
      name: "Hydro PowerEdge",
      description: t("hydro_descr"),
    },
    {
      link: "hydrogen-horizons",
      image: Hydrogen,
      name: "Hydrogen Horizons",
      description: t("hydrogen_descr"),
    },
    {
      link: "mining-farms",
      image: Mining,
      name: "Mining Farms",
      description: t("mining_descr"),
    },
  ];
};

const Investments = () => {
  const { t } = useTranslation("investments");
  const [calculatorIsOpen, setCalculatorIsOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setCalculatorIsOpen(newOpen);
  };

  return (
    <div className={`${styles["investments"]} container`}>
      <h2 className={"page-title"}>{t("investments")}</h2>
      <p className={styles["subtitle"]}>{t("subtitle")}</p>
      <ul className={styles["plans-list"]}>
        {getPlans(t).map((plan) => {
          return (
            <li key={plan.name}>
              <NavLink to={`/investments/${plan.link}`}>
                <SuspenseImage src={plan.image} alt={""} />
                <div className={styles["info"]}>
                  <h3>{plan.name}</h3>
                  <p>{plan.description}</p>
                </div>
                <ArrowButton />
              </NavLink>
            </li>
          );
        })}
      </ul>
      <Instruction />
      <ContactUs />
      <ScrollRestoration />
      <button onClick={toggleDrawer(true)} className={styles["calculator-button"]}>
        <img src={CalculatorIcon} alt={""} width={25} />
        <span>Калькулятор</span>
      </button>
      <Drawer
        open={calculatorIsOpen}
        onClose={toggleDrawer(false)}
        sx={{ "& .MuiDrawer-paper": { backgroundColor: "#eeeeee" } }}
      >
        <Calculator />
      </Drawer>
    </div>
  );
};

export default Investments;
