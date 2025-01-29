import styles from "./Partners.module.scss";
import BaywareIcon from "@assets/images/partners/bayware.png";
import EdfIcon from "@assets/images/partners/edf.svg";
import EnelIcon from "@assets/images/partners/enel.png";
import IberdrolaIcon from "@assets/images/partners/iberdrola.svg";
import OrstedIcon from "@assets/images/partners/orsted.svg";
import ScatedIcon from "@assets/images/partners/scatec.svg";
import { useRef } from "react";
import { motion, useInView } from "motion/react";

const LOGOS = [BaywareIcon, EdfIcon, EnelIcon, IberdrolaIcon, OrstedIcon, ScatedIcon];

const partnersVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.5 },
  }),
};

const Partners = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <motion.div
      ref={ref}
      variants={partnersVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={0.3}
      className={`${styles.partners}`}
    >
      <motion.div
        className={styles.text}
        variants={partnersVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={0.7}
      >
        <h3>
          Наши решения{" "}
          <span>
            воплощены <br /> во многих <br />{" "}
          </span>
          крупных компаниях
        </h3>
        <div className={styles.bottomText}>
          <h4>Мы работаем с лучшими</h4>
          <p>
            Наши решения представлены в 30 странах мира: от Австралии до Мексики, от Африки до Тайланда. Нам
            доверяют, нас ценят.
          </p>
        </div>
      </motion.div>
      {LOGOS.map((logo, index) => {
        return (
          <motion.div
            variants={partnersVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.2 * index}
            className={styles.logoWrapper}
          >
            <img src={logo} alt={""} width={"100%"} />
          </motion.div>
        );
      })}

      <div className={styles["mobile-bottom-text"]}>
        <h4>Мы работаем с лучшими</h4>
        <p>
          Наши решения представлены в 30 странах мира: от Австралии до Мексики, от Африки до Тайланда. Нам
          доверяют, нас ценят.
        </p>
      </div>
    </motion.div>
  );
};

export default Partners;
