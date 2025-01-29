import Logo from "@assets/logo.svg?react";
import styles from "./Menu.module.scss";
import { NavLink } from "react-router-dom";
import useIsHomePage from "@/hooks/useIsHomePage.ts";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

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

const MotionNavLink = motion(NavLink);

const Menu = () => {
  const isHomePage = useIsHomePage();
  const ref = useRef(null);
  const isInView = useInView(ref);

  const menuItems = [
    { path: "/products", label: "Продукты" },
    { path: "/investments", label: "Инвестиции" },
    { path: "/partner-program", label: "Партнёрская программа" },
    { path: "/about-us", label: "О нас" },
    { path: "/faq", label: "FAQ" },
    { path: "/contacts", label: "Контакты" },
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
            <motion.li key={item.path} custom={index} variants={menuVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
              <NavLink
                to={item.path}
                className={({ isActive, isPending }) => (isPending ? styles["pending"] : isActive ? styles["active"] : "")}
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
        custom={menuItems.length * 0.1} // Задержка после списка
      >
        <MotionNavLink
          to={"/sign-in"}
          className={styles.signInButton}
          variants={buttonVariants}
          custom={menuItems.length * 0.1 + 0.2} // Чуть позже после меню
        >
          Войти
        </MotionNavLink>

        <MotionNavLink
          to={"/contacts"}
          variants={buttonVariants}
          custom={menuItems.length * 0.1 + 0.4} // Еще чуть позже
        >
          <motion.button className={styles.contactUsButton}>Связаться с нами</motion.button>
        </MotionNavLink>
      </motion.div>
    </div>
  );
};

export default Menu;
