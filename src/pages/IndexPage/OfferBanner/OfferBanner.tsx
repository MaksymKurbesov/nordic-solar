import styles from "./OfferBanner.module.scss";
import { CircleButton } from "@SharedUI/CirlceButton/CircleButton.tsx";
import { NavLink } from "react-router-dom";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Trans, useTranslation } from "react-i18next";

const bannerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.5 },
  }),
};

const MotionNavLink = motion.create(NavLink);

const OfferBanner = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const { t } = useTranslation("indexPage");

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
          <Trans
            i18nKey="direct_investment"
            components={{
              // Название ключа должно совпадать с тегом в переводе, например <green>
              span: <span />,
            }}
          />
          {/*Прямые инвестиции в проекты по <br /> <span>возобновляемым источникам энергии</span>*/}
        </motion.h2>
        <MotionNavLink
          target="_blank"
          to={"/investments"}
          variants={bannerVariants}
          animate={isInView ? "visible" : "hidden"}
          custom={1.5}
        >
          <CircleButton text={t("view_offer")} cn={"offer-button"} />
        </MotionNavLink>
      </div>
    </motion.div>
  );
};

export default OfferBanner;
