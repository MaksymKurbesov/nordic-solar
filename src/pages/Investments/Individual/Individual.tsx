import styles from "./Individual.module.scss";
import WideButton from "@SharedUI/WideButton/WideButton.tsx";
import HeroImage from "@assets/images/investments/individual-hero.png";
import ContactUs from "@SharedUI/ContactUs/ContactUs.tsx";
import PlanVariants from "@SharedUI/PlanVariants/PlanVariants.tsx";

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
        <PlanVariants />
      </div>
      <ContactUs />
    </div>
  );
};

export default Individual;
