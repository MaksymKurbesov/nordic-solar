import styles from "./Footer.module.scss";
import Logo from "@assets/logo.svg?react";
import { CircleButton } from "../CirlceButton/CircleButton.tsx";
import { NavLink } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";

const Footer = ({ isFullFooter }: { isFullFooter?: boolean }) => {
  const { t } = useTranslation(["indexPage", "menu"]);

  return (
    <div className={`${styles.footer} container`}>
      {isFullFooter && (
        <div className={styles.topFooter}>
          <Logo className={styles.logo} width={250} />
          <div className={styles.contacts}>
            <a href={"#"}>+47 24 06 7003</a>
            <a href={"#"}>support@nordic-solar.tech</a>
          </div>
          <div className={styles.circleButton}>
            <CircleButton text={t("contact_us")} cn={"white-button"} />
          </div>
        </div>
      )}
      <div className={styles.bottomFooter}>
        <div className={styles.copyright}>
          <Trans i18nKey={"experts_short"} components={{ br: <br /> }} />
          <p className={styles["copyright-text"]}>Copyright © Nordic Solar 2025</p>
        </div>
        <nav>
          <h3>{t("menu:navigation")}</h3>
          <ul>
            <li>
              <NavLink to={"/products"}>{t("menu:products")}</NavLink>
            </li>
            <li>
              <NavLink to={"/investments"}>{t("menu:investments")}</NavLink>
            </li>
            <li>
              <NavLink to={"/partner-program"}>{t("menu:partner-program")}</NavLink>
            </li>
            <li>
              <NavLink to={"/about-us"}>{t("menu:about-us")}</NavLink>
            </li>
            <li>
              <NavLink to={"/faq"}>FAQ</NavLink>
            </li>
            <li>
              <NavLink to={"/contacts"}>{t("menu:contacts")}</NavLink>
            </li>
            <li>
              <NavLink to={"/company-documents"}>{t("menu:documents")}</NavLink>
            </li>
            <li>
              <NavLink to={"/privacy-policy"}>{t("menu:policy")}</NavLink>
            </li>
            <li>
              <NavLink to={"/terms-of-use"}>{t("menu:terms")}</NavLink>
            </li>
          </ul>
        </nav>
        <nav>
          <h3>{t("menu:socials")}</h3>
          <ul>
            <li>
              <a href={"https://www.instagram.com/nordic.solar_official/"} target={"_blank"}>
                Instagram
              </a>
            </li>
            <li>
              <a href={"https://t.me/nordic_solar_news"} target={"_blank"}>
                Telegram
              </a>
            </li>
            <li>
              <a href={"https://x.com/nordic_solar"}>X (twitter)</a>
            </li>
          </ul>
        </nav>
        <div className={styles.office}>
          <h3>{t("menu:office")}</h3>
          <p>
            Norway <br /> Oslo, Lilleakerveien 14 P.O Box 200 Lilleaker <br /> NO-0216
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
