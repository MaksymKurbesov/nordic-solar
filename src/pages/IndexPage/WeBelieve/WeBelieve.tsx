import styles from "./WeBelieve.module.scss";
import Image from "@assets/images/weBelieve.png";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useTranslation } from "react-i18next";

const textVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (delay: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay, duration: 0.5 },
  }),
};

const WeBelieve = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const { t } = useTranslation("indexPage");

  return (
    <div ref={ref} id={"we-believe"} className={styles.weBelieve}>
      <h2>
        <motion.span
          variants={textVariants}
          custom={0.4}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={styles.gray}
        >
          {t("we_believe1")}
        </motion.span>{" "}
        <motion.span
          variants={textVariants}
          custom={0.6}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={styles.green}
        >
          {t("we_believe2")}
        </motion.span>{" "}
        <motion.span
          variants={textVariants}
          custom={0.8}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {t("we_believe3")}
        </motion.span>
      </h2>
      <motion.img
        variants={textVariants}
        custom={0.8}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        src={Image}
        alt={""}
      />
    </div>
  );
};

export default WeBelieve;
