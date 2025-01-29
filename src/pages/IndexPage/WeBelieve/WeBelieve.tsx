import styles from "./WeBelieve.module.scss";
import Image from "@assets/images/weBelieve.png";
import { useRef } from "react";
import { motion, useInView } from "motion/react";

const textVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (delay) => ({
    opacity: 1,
    x: 0,
    transition: { delay, duration: 0.5 },
  }),
};

const WeBelieve = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);

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
          Мы верим в мир, в котором
        </motion.span>{" "}
        <motion.span
          variants={textVariants}
          custom={0.6}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={styles.green}
        >
          чистая, <br />
          возобновляемая
        </motion.span>{" "}
        <motion.span variants={textVariants} custom={0.8} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          энергия питает <br />
          наши дома и предприятия
        </motion.span>
      </h2>
      <motion.img variants={textVariants} custom={0.8} initial="hidden" animate={isInView ? "visible" : "hidden"} src={Image} alt={""} />
    </div>
  );
};

export default WeBelieve;
