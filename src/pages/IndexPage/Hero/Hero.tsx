import styles from "./Hero.module.scss";

import { CircleButton } from "@SharedUI/CirlceButton/CircleButton.tsx";
import ArrowIcon from "@assets/icons/arrow.svg?react";

const Hero = () => {
  return (
    <>
      <div className={"container"}>
        <h1 className={styles.title}>
          Инвестируем в зеленую энергетику, <br />
          <span>создавая чистое и устойчивое будущее</span>
        </h1>
      </div>

      <CircleButton text={"Наши решения"} cn={"hero-button"} />
      <p className={styles.subtitle}>
        Эксперты в солнечной энергетике, <br /> и сфере альтернативного питания
      </p>
      <button className={styles.downButton}>
        Вниз
        <ArrowIcon />
      </button>
    </>
  );
};

export default Hero;
