import styles from "./Hero.module.scss";
import { CircleButton } from "@SharedUI/CirlceButton/CircleButton.tsx";
import ArrowIcon from "@assets/icons/arrow.svg?react";
import { NavLink } from "react-router-dom";
import { FC, useRef } from "react";
import { motion, useInView } from "motion/react";

interface IHeroProps {
  handleScrollDown: () => void;
}

const Hero: FC<IHeroProps> = ({ handleScrollDown }) => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <motion.div ref={ref}>
      <div className={"container"}>
        <motion.h1
          className={styles.title}
          transition={{ duration: 1, delay: 0.6 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
        >
          Инвестируем в <p className={styles["green"]}>зеленую</p> энергетику,
          <br />
          <span>создавая чистое и устойчивое будущее</span>
        </motion.h1>
      </div>

      <NavLink target="_blank" to={"/products"}>
        <motion.div
          className={styles["circle-button"]}
          transition={{ duration: 1, delay: 0.7 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
        >
          <CircleButton text={"Наши решения"} cn={"hero-button"} />
        </motion.div>
      </NavLink>
      <motion.p
        className={styles.subtitle}
        transition={{ duration: 1, delay: 1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
      >
        Эксперты в солнечной энергетике, <br /> и сфере альтернативного питания
      </motion.p>
      <a onClick={() => handleScrollDown()} className={styles.downButton}>
        Вниз
        <ArrowIcon />
      </a>
    </motion.div>
  );
};

export default Hero;
