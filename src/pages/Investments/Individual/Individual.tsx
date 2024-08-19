import styles from "./Individual.module.scss";
import WideButton from "@SharedUI/WideButton/WideButton.tsx";
import HeroImage from "@assets/images/investments/individual-hero.png";
import { ScrollRestoration } from "react-router-dom";
import GeoIcon from "@assets/icons/geo.svg?react";
import MoneyIcon from "@assets/icons/money.svg?react";
import Contacts from "@/pages/Contacts/Contacts.tsx";
import ContactUs from "@SharedUI/ContactUs/ContactUs.tsx";

const PLANS = [
  {
    name: "Начальный",
    region: "Америка",
    accruals: "Ежедневно",
    inDay: 1.2,
    days: 15,
    minDeposit: 100,
    maxDeposit: 10000,
  },
  {
    name: "Доступный",
    region: "Африка",
    accruals: "Ежедневно",
    inDay: 1.8,
    days: 25,
    minDeposit: 100,
    maxDeposit: 10000,
  },
  {
    name: "Оптимальный",
    region: "Азия",
    accruals: "Ежедневно",
    inDay: 1.2,
    days: 15,
    minDeposit: 100,
    maxDeposit: 10000,
  },
  {
    name: "Максимальный",
    region: "Европа",
    accruals: "Ежедневно",
    inDay: 1.2,
    days: 15,
    minDeposit: 100,
    maxDeposit: 10000,
  },
];

const Individual = () => {
  return (
    <div className={`${styles["individual"]} container`}>
      <h2 className={"page-title"}>Индивидуальные инвестиционные планы</h2>
      <WideButton text={"Обсудить план"} />
      <p className={styles["subtitle"]}>
        <span>Персонализированное</span> управление портфелем, <br />{" "}
        индивидуальные консультации и регулярные отчеты
      </p>
      <img
        src={HeroImage}
        alt={""}
        width={"100%"}
        className={styles["hero-image"]}
      />
      <div className={styles["text"]}>
        <p className={styles["individual-plans-text"]}>
          <span>Индивидуальные планы,</span> разработанные с учетом <br /> ваших
          целей и потребностей
        </p>
        <div className={styles["individual-plans-text2"]}>
          <p>
            Получите персонализированное управление портфелем, <br />
            индивидуальные консультации и регулярные отчеты
          </p>
        </div>
      </div>
      <div className={styles["plans"]}>
        <h4>Варианты доступных планов</h4>
        <ul className={styles["plans-list"]}>
          {PLANS.map((plan) => {
            return (
              <li key={plan.name}>
                <p>{plan.name}</p>
                <div className={styles["plan-row"]}>
                  <div className={styles["region"]}>
                    <span>
                      <GeoIcon height={18} /> Регион
                    </span>
                    <p>{plan.region}</p>
                  </div>
                  <div className={styles["accruals"]}>
                    <span>
                      <MoneyIcon height={18} />
                      Начисления
                    </span>
                    <p>{plan.accruals}</p>
                  </div>
                </div>
                <div className={styles["plan-row"]}>
                  <div>
                    <span>В день</span>
                    <p>{plan.inDay}%</p>
                  </div>
                  <div>
                    <span>Дней</span>
                    <p>{plan.days}</p>
                  </div>
                  <div>
                    <span>Мин. депозит</span>
                    <p>${plan.minDeposit}</p>
                  </div>
                  <div>
                    <span>Макс. депозит</span>
                    <p>${plan.maxDeposit}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <ContactUs />
    </div>
  );
};

export default Individual;
