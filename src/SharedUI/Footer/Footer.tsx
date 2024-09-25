import styles from "./Footer.module.scss";
import Logo from "@assets/logo.svg?react";
import { CircleButton } from "../CirlceButton/CircleButton.tsx";

const Footer = ({ isFullFooter }) => {
  return (
    <div className={`${styles.footer} container`}>
      {isFullFooter && (
        <div className={styles.topFooter}>
          <Logo className={styles.logo} />
          <div className={styles.contacts}>
            <a href={"#"}>+38 033 277 72 75</a>
            <a href={"#"}>enquiries@nordic.solutions</a>
          </div>
          <div className={styles.circleButton}>
            <CircleButton text={"Связаться с нами"} cn={"white-button"} />
          </div>
        </div>
      )}
      <div className={styles.bottomFooter}>
        <div className={styles.copyright}>
          <p>
            Эксперты в солнечной энергетике, <br />и сфере альтернативного
            питания
          </p>
          <p className={styles["copyright-text"]}>
            Copyright © Nordic Solutions 2020
          </p>
        </div>
        <nav>
          <h3>Навигация</h3>
          <ul>
            <li>
              <a href={"#"}>Продукты</a>
            </li>
            <li>
              <a href={"#"}>Инвестиции</a>
            </li>
            <li>
              <a href={"#"}>О нас</a>
            </li>
            <li>
              <a href={"#"}>FAQ</a>
            </li>
            <li>
              <a href={"#"}>Контакты</a>
            </li>
          </ul>
        </nav>
        <nav>
          <h3>Мы в соцсетях</h3>
          <ul>
            <li>
              <a href={"#"}>Facebook</a>
            </li>
            <li>
              <a href={"#"}>Twitter</a>
            </li>
            <li>
              <a href={"#"}>Linkedin</a>
            </li>
          </ul>
        </nav>
        <div className={styles.office}>
          <h3>Офис</h3>
          <p>
            Украина <br /> Киев, улица Центральная 28 <br /> 01001
          </p>
        </div>
        <p className={styles["mobile-copyright-text"]}>
          Copyright © Nordic Solutions {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default Footer;
