import styles from "./Partners.module.scss";
import BaywareIcon from "@assets/images/partners/bayware.png";
import EdfIcon from "@assets/images/partners/edf.svg";
import EnelIcon from "@assets/images/partners/enel.png";
import IberdrolaIcon from "@assets/images/partners/iberdrola.svg";
import OrstedIcon from "@assets/images/partners/orsted.svg";
import ScatedIcon from "@assets/images/partners/scatec.svg";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Trans, useTranslation } from "react-i18next";

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
  const { t } = useTranslation("indexPage");

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
          <Trans i18nKey={"partners_title"} components={{ span: <span />, br: <br /> }} />
        </h3>
        <div className={styles.bottomText}>
          <h4>{t("work_with_better")}</h4>
          <p>{t("partners_subtitle")}</p>
        </div>
      </motion.div>
      {LOGOS.map((logo, index) => {
        return (
          <div key={index} className={styles.logoWrapper}>
            <motion.img
              variants={partnersVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.2 * index}
              src={logo}
              alt={""}
              width={"100%"}
            />
          </div>
        );
      })}

      <div className={styles["mobile-bottom-text"]}>
        <h4>{t("work_with_better")}</h4>
        <p>{t("partners_subtitle")}</p>
      </div>
    </motion.div>
  );
};

export default Partners;
