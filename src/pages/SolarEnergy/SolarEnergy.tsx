import styles from "./SolarEnergy.module.scss";
import WideButton from "@SharedUI/WideButton/WideButton.tsx";
import HeroImage from "@assets/images/solar-energy/hero.png";
import { ScrollRestoration } from "react-router-dom";
import GalleryImage1 from "@assets/images/solar-energy/gallery1.png";
import GalleryImage2 from "@assets/images/solar-energy/gallery2.png";
import GalleryImage3 from "@assets/images/solar-energy/gallery3.png";
import Questions from "@/pages/SolarEnergy/Questions/Questions.tsx";

const SolarEnergy = () => {
  return (
    <div className={"container"}>
      <div className={styles["solar-energy"]}>
        <h2 className={"page-title"}>Cолнечные фермы</h2>
        <WideButton text={"Обсудить проект"} />
        <p className={styles["subtitle"]}>
          <span>Инновационный</span> способ использования возобновляемых <br />
          источников энергии <span>для выработки электричества</span>
        </p>
        <img
          className={styles["hero-image"]}
          src={HeroImage}
          alt={""}
          width={"100%"}
        />
        <p className={styles["main-text"]}>
          <span>Наши солнечные фермы</span>{" "}
          <span className={styles["white"]}>обеспечивают</span> чистую и
          возобновляемую энергию,{" "}
          <span>снижая углеродный след и способствуя устойчивому развитию</span>
        </p>
        <p className={styles["sub-text"]}>
          <span>Мы установили более</span> 100,000 солнечных панелей,{" "}
          <span>которые генерируют свыше</span> 50 мегаватт (МВт) энергии
          ежегодно. <span>Это эквивалентно</span> снижению выбросов CO2 на
          25,000 тонн в год, <span>что сравнимо с посадкой</span> 1 миллиона
          деревьев.
        </p>
        <div className={styles["gallery"]}>
          <img src={GalleryImage1} alt={""} />
          <div>
            <img src={GalleryImage2} alt={""} />
            <img src={GalleryImage3} alt={""} />
          </div>
        </div>
        <Questions />
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default SolarEnergy;
