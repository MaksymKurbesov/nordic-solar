import styles from "./OfferBanner.module.scss";
import { CircleButton } from "@SharedUI/CirlceButton/CircleButton.tsx";
import { NavLink } from "react-router-dom";
import { useRef } from "react";
import { motion, useInView } from "motion/react";

const bannerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.5 },
  }),
};

const MotionNavLink = motion(NavLink);

const OfferBanner = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <motion.div
      ref={ref}
      className={`${styles.offerBannerWrapper}`}
      initial={{ opacity: 0 }}
      variants={bannerVariants}
      animate={isInView ? "visible" : "hidden"}
      custom={0.6}
    >
      <div className={`${styles.offerBanner}`}>
        <motion.h2
          initial={{ opacity: 0 }}
          variants={bannerVariants}
          animate={isInView ? "visible" : "hidden"}
          custom={1.2}
        >
          Прямые инвестиции в проекты по <br /> <span>возобновляемым источникам энергии</span>
        </motion.h2>
        <MotionNavLink
          target="_blank"
          to={"/investments"}
          variants={bannerVariants}
          animate={isInView ? "visible" : "hidden"}
          custom={1.5}
        >
          <CircleButton text={"Смотреть предложения"} cn={"offer-button"} />
        </MotionNavLink>
      </div>
    </motion.div>
  );
};

export default OfferBanner;
