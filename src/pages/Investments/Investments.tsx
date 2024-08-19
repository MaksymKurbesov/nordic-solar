import styles from "./Investments.module.scss";
import Individual from "@assets/images/investments/individual.webp";
import MutualFonds from "@assets/images/investments/mutual-fonds.webp";
import DirectInvestments from "@assets/images/investments/direct-investments.webp";
import Corporative from "@assets/images/investments/corporative.webp";
import Crowdfounding from "@assets/images/investments/crowdfunding.webp";
import Pension from "@assets/images/investments/pension.webp";
import ArrowButton from "@SharedUI/ArrowButton/ArrowButton.tsx";
import Instruction from "@/pages/Investments/Instruction/Instruction.tsx";
import ContactUs from "@SharedUI/ContactUs/ContactUs.tsx";
import { NavLink } from "react-router-dom";

const PLANS = [
  {
    link: "individual-investment-plans",
    image: Individual,
    name: "Индивидуальные инвестиционные планы",
    description:
      "Индивидуальные планы, разработанные с учетом ваших целей и потребностей. Получите персонализированное управление портфелем, индивидуальные консультации и регулярные отчеты",
  },
  {
    link: "mutual-fonds",
    image: MutualFonds,
    name: "Взаимные фонды зеленой энергетики",
    description:
      "Инвестируйте в диверсифицированные фонды, включающие проекты в солнечной, ветровой, гидроэнергетике и водородных технологиях. Диверсификация снижает риски, а профессиональное управление активами обеспечивает стабильный доход",
  },
  {
    link: "direct-investments",
    image: DirectInvestments,
    name: "Программы прямых инвестиций",
    description:
      "Программы для крупных инвесторов, заинтересованных в прямом владении долей в проектах зеленой энергетики. Высокая доходность и контроль над инвестициями с возможностью участия в управлении проектами",
  },
  {
    link: "",
    image: Corporative,
    name: "Корпоративные инвестиционные планы",
    description:
      "Планы для компаний, стремящихся снизить углеродный след и повысить устойчивость за счет инвестиций в зеленую энергетику. Разработка корпоративных стратегий устойчивого развития и внедрение зеленых технологий",
  },
  {
    link: "",
    image: Crowdfounding,
    name: "Программы коллективных инвестиций (Crowdfunding)",
    description:
      "Платформа для коллективных инвестиций, позволяющая частным лицам объединять средства для финансирования проектов зеленой энергетики. Доступные пороги входа, прозрачность и регулярные отчеты",
  },
  {
    link: "",
    image: Pension,
    name: "Пенсионные инвестиционные планы",
    description:
      "Долгосрочные планы для накопления пенсионных средств. Стабильный доход, минимальные риски и регулярные выплаты обеспечат надежное будущее",
  },
];

const Investments = () => {
  return (
    <div className={`${styles["investments"]} container`}>
      <h2 className={"page-title"}>Инвестиции</h2>
      <p className={styles["subtitle"]}>
        Мы готовы представить разные планы инвестирования для различных
        требований
      </p>
      <ul className={styles["plans-list"]}>
        {PLANS.map((plan) => {
          return (
            <li key={plan.name}>
              <NavLink to={`/investments/${plan.link}`}>
                <img src={plan.image} alt={""} />
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
    </div>
  );
};

export default Investments;
