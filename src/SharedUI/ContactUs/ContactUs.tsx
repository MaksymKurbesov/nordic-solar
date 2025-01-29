import styles from "./ContactUs.module.scss";
import WideButton from "@SharedUI/WideButton/WideButton.tsx";
import { NavLink } from "react-router-dom";
import { useRef } from "react";
import { motion, useInView } from "motion/react";

const contactVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.5 },
  }),
};

const MotionNavLink = motion(NavLink);

const ContactUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <motion.div
      className={`${styles.contactUs}`}
      ref={ref}
      variants={contactVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={0.3}
    >
      <motion.h2
        variants={contactVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={0.7}
      >
        Мы вас <br /> заинтересовали?
      </motion.h2>
      <MotionNavLink
        variants={contactVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={1}
        target="_blank"
        to={"/contacts"}
      >
        <WideButton text={"Связаться с нами"} />
      </MotionNavLink>
      <motion.p
        variants={contactVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={1.3}
        className={styles.subtitle}
      >
        Эксперты в солнечной энергетике, и сфере альтернативного питания <br />
        <span>Мы верим в мир, в котором чистая, возобновляемая энергия питает наши дома и предприятия</span>
      </motion.p>
    </motion.div>
  );
};

export default ContactUs;
