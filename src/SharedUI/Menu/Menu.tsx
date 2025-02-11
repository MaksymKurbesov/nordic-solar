import Logo from "@assets/logo.svg?react";
import styles from "./Menu.module.scss";
import { NavLink } from "react-router-dom";
import useIsHomePage from "@/hooks/useIsHomePage.ts";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import CustomSelect from "@SharedUI/CustomSelect/CustomSelect.tsx";

const logoVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, delay: 0.4 } },
};

const menuVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

const buttonVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.5 },
  }),
};

const MotionNavLink = motion.create(NavLink);

const Menu = () => {
  const isHomePage = useIsHomePage();
  const ref = useRef(null);
  const isInView = useInView(ref);
  const { t } = useTranslation("menu");

  const menuItems = [
    { path: "/products", label: t("products") },
    { path: "/investments", label: t("investments") },
    { path: "/partner-program", label: t("partner-program") },
    { path: "/about-us", label: t("about-us") },
    { path: "/faq", label: t("FAQ") },
    { path: "/contacts", label: t("Contacts") },
  ];

  return (
    <div className={`${styles.menu} ${isHomePage ? styles.menuIndex : ""} container`}>
      <MotionNavLink
        className={styles["logotype"]}
        to={"/"}
        initial={{ opacity: 0 }}
        variants={logoVariants}
        animate={isInView ? "visible" : "hidden"}
      >
        <Logo width={120} />
      </MotionNavLink>
      <nav className={styles.navigation} ref={ref}>
        <ul className={styles["navigation-list"]}>
          {menuItems.map((item, index) => (
            <motion.li
              key={item.path}
              custom={index}
              variants={menuVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <NavLink
                to={item.path}
                className={({ isActive, isPending }) =>
                  isPending ? styles["pending"] : isActive ? styles["active"] : ""
                }
              >
                {item.label}
              </NavLink>
            </motion.li>
          ))}
        </ul>
      </nav>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={buttonVariants}
        custom={menuItems.length * 0.1}
        className={styles["sign-in-buttons"]}
      >
        <MotionNavLink
          to={"/sign-in"}
          className={styles.signInButton}
          variants={buttonVariants}
          custom={menuItems.length * 0.1 + 0.2} // Чуть позже после меню
        >
          {t("login")}
        </MotionNavLink>

        <MotionNavLink
          to={"/contacts"}
          variants={buttonVariants}
          custom={menuItems.length * 0.1 + 0.4} // Еще чуть позже
        >
          <motion.button className={styles.contactUsButton}> {t("contact-us")}</motion.button>
        </MotionNavLink>
        <CustomSelect />
      </motion.div>
    </div>
  );
};

export default Menu;
