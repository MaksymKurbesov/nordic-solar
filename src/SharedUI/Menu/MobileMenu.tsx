import styles from "./MobileMenu.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "@assets/logo.svg?react";
import { useEffect, useRef, useState } from "react";
import useWindowSize from "@/hooks/useWindowSize.ts";
import { motion, useInView } from "motion/react";

const menuVariants = {
  hidden: { opacity: 0 },
  visible: () => ({
    opacity: 1,
    transition: { delay: 0.5, duration: 0.5 },
  }),
};

const MobileMenu = () => {
  const [menuIsOpened, setMenuIsOpened] = useState(false);
  const windowSize = useWindowSize();
  const location = useLocation();
  const isMobile = windowSize.width < 1051;
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    setMenuIsOpened(false);
  }, [location.pathname]);

  if (!isMobile) return null;

  return (
    <>
      <div className={`${styles["menu-overlay"]} ${menuIsOpened ? styles["menu-opened"] : ""}`}>
        <div className={styles["menu-content"]}>
          <nav className={styles["navigation"]}>
            <NavLink className={styles["logotype"]} to={"/"}>
              <Logo />
            </NavLink>
            <ul className={styles["navigation-list"]}>
              <li>
                <NavLink to={"/products"}>Продукты</NavLink>
              </li>
              <li>
                <NavLink to={"/investments"}>Инвестиции</NavLink>
              </li>
              <li>
                <NavLink to={"/partner-program"}>Партнёрская программа</NavLink>
              </li>
              <li>
                <NavLink to={"/about-us"}>О нас</NavLink>
              </li>
              <li>
                <NavLink to={"/faq"}>FAQ</NavLink>
              </li>
              <li>
                <NavLink to={"/contacts"}>Контакты</NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div onClick={() => setMenuIsOpened(false)} className={styles["close-button"]}>
          <span></span>
          <span></span>
        </div>
      </div>
      <motion.div
        ref={ref}
        variants={menuVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        onClick={() => {
          setMenuIsOpened(true);
        }}
        className={`${styles["mobile-menu"]}`}
      >
        <span></span>
        <span></span>
      </motion.div>
    </>
  );
};

export default MobileMenu;
