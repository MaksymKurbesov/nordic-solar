import styles from "./Calculator.module.scss";
import InvestImage1 from "@assets/images/investments/solar-future.webp";
import InvestImage2 from "@assets/images/investments/wind-prosperity.webp";
import InvestImage3 from "@assets/images/investments/hydro.webp";
import InvestImage4 from "@assets/images/investments/hydrogen.webp";
import InvestImage5 from "@assets/images/investments/mining-farm.webp";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { ChangeEvent, useEffect, useState } from "react";
import { calculateDailyIncome, calculateTotalIncome } from "@/utils/helpers.tsx";
import { motion, useSpring, useTransform } from "motion/react";

const getPlanByKeyAndValue = (key, value) => {
  if (PLANS[key]) {
    return PLANS[key].find((plan) => plan.value === value) || null;
  }
  return null;
};

const PLANS = {
  solar: [
    { label: "Sunlight Start (50$ - 1999$)", days: 45, inDay: 1.1, value: "Sunlight Start" },
    { label: "Solar Expansion (2000$ - 9999$)", days: 30, inDay: 1.8, value: "Solar Expansion" },
    { label: "Radiant Yield (10000$ - 29999$)", days: 15, inDay: 2.5, value: "Radiant Yield" },
    { label: "Solar Innovate (30000$ - ∞)", days: null, inDay: null, value: "Solar Innovate" },
  ],
  wind: [
    { label: "Breeze Start (200$ - 999$)", days: 20, inDay: 0.6, value: "Breeze Start" },
    { label: "Wind Fields (1000$ - 9999$)", days: 20, inDay: 0.9, value: "Wind Fields" },
    { label: "Aero Advantage (10000$ - 29999$)", days: 30, inDay: 1.1, value: "Aero Advantage" },
    { label: "Turbine Tech (30000$ - ∞)", days: null, inDay: null, value: "Turbine Tech" },
  ],
  hydro: [
    { label: "River Flow (300$ - 1999$)", days: 20, inDay: 0.7, value: "River Flow" },
    { label: "Hydro Expansion (2000$ - 14999$)", days: 30, inDay: 1, value: "Hydro Expansion" },
    { label: "EcoHydro (15000$ - 29999$)", days: 20, inDay: 2, value: "EcoHydro" },
    { label: "Blue Energy R&D (30000$ - ∞)", days: 45, inDay: 1.2, value: "Blue Energy R&D" },
  ],
  hydrogen: [
    { label: "H2 Mining Start (1000$ - 7999$)", days: 45, inDay: 1.5, value: "H2 Mining Start" },
    {
      label: "Hydrogen Expansion (8000$ - 14999$)",
      days: 30,
      inDay: 2.1,
      value: "Green Hydrogen Expansion",
    },
    { label: "Hydrogen Fuel Cells (15000$ - 39999$)", days: 21, inDay: 3, value: "Hydrogen Fuel Cells" },
    { label: "Mining Power (40000$ - ∞)", days: null, inDay: null, value: "Mining Power" },
  ],
  mining: [
    { label: "CryptoGrow (2000$ - 9999$)", days: 90, inDay: 0.45, value: "CryptoGrow" },
    { label: "ProfitMine (10000$ - ∞)", days: 45, inDay: 0.23, value: "ProfitMine" },
  ],
};

const planTypes = [
  { name: "Solar Future", img: InvestImage1, value: "solar" },
  { name: "Wind Prosperity", img: InvestImage2, value: "wind" },
  { name: "Hydro PowerEdge", img: InvestImage3, value: "hydro" },
  { name: "Hydrogen Horizons", img: InvestImage4, value: "hydrogen" },
  { name: "Mining Farms", img: InvestImage5, value: "mining" },
];

function AnimatedDays({ value }: { value: number }) {
  let spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
  let display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
}

function AnimatedNumber({ value }: { value: number }) {
  let spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
  let display = useTransform(spring, (current) => current.toFixed(3));

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
}

const Calculator = () => {
  const [investType, setInvestType] = useState("");
  const [variant, setVariant] = useState("");
  const [amount, setAmount] = useState(0);
  const [planData, setPlanData] = useState(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;

    setVariant(value);
    setPlanData(getPlanByKeyAndValue(investType, value));
  };

  console.log(getPlanByKeyAndValue(investType, variant), "getPlanByKeyAndValue(investType, variant)");

  return (
    <div className={styles["calculator"]}>
      <h2>1. Выберите тип инвестиций</h2>
      <ul className={styles["type-list"]}>
        {planTypes.map((type) => {
          return (
            <li
              className={`${investType === type.value ? styles["active-type"] : ""}`}
              onClick={() => setInvestType(type.value)}
              key={type.name}
            >
              <img src={type.img} alt={""} width={100} />
              <span>{type.name}</span>
            </li>
          );
        })}
      </ul>
      <h2>2. Выберите вариант инвестиций</h2>
      <ul className={styles["variant-list"]}>
        <RadioGroup name="variants" value={variant} onChange={handleChange}>
          {PLANS[investType]?.map((item, index) => {
            return (
              <FormControlLabel
                value={item.value}
                control={
                  <Radio size={"small"} sx={{ color: "#14cc74", "&.Mui-checked": { color: "#14cc74" } }} />
                }
                label={item.label}
                disabled={index === 3}
              />
            );
          })}
        </RadioGroup>
      </ul>
      <h2>3. Укажите сумму инвестиций</h2>
      <div className={styles["amount-input-wrapper"]}>
        <input
          value={amount}
          onChange={(e) => {
            const newValue = e.target.value.replace(/\D/g, "");
            setAmount(newValue);
          }}
          type={"text"}
          className={styles["amount-input"]}
        />
      </div>

      <div className={styles["result"]}>
        <div>
          <p>Дней</p>
          {/*<span>{planData?.days}</span>*/}
          <span>
            <AnimatedDays value={planData?.days || 0} />
          </span>
        </div>
        <div>
          <p>Доход в день</p>
          <span>
            <AnimatedNumber value={Number(calculateDailyIncome(amount, planData?.inDay))} />$
          </span>
        </div>
        <div>
          <p>Общий доход</p>
          <span>
            <AnimatedNumber value={Number(calculateTotalIncome(amount, planData?.inDay, planData?.days))} />$
          </span>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
