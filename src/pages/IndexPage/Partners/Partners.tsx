import styles from "./Partners.module.scss";
import BoseIcon from "@assets/images/partners/bose.png";
import WalmartIcon from "@assets/images/partners/walmart.png";
import PorscheIcon from "@assets/images/partners/porsche.png";
import AmazonIcon from "@assets/images/partners/amazon.png";

const Partners = () => {
  return (
    <div className={`${styles.partners}`}>
      <div className={styles.text}>
        <h3>
          Наши решения{" "}
          <span>
            воплощены <br /> во многих <br />{" "}
          </span>
          крупных компаниях
        </h3>
        <div className={styles.bottomText}>
          <h4>Мы работаем с лучшими</h4>
          <p>
            Наши решения представлены в 30 странах мира: от Австралии до
            Мексики, от Африки до Тайланда. Нам доверяют, нас ценят.
          </p>
        </div>
      </div>
      <div className={styles.logoWrapper}>
        <img src={BoseIcon} alt={""} width={"100%"} />
      </div>
      <div className={styles.logoWrapper}>
        <img src={WalmartIcon} alt={""} width={"100%"} />
      </div>
      <div className={styles.logoWrapper}>
        <img src={PorscheIcon} alt={""} width={"100%"} />
      </div>
      <div className={styles.logoWrapper}>
        <img src={AmazonIcon} alt={""} width={"100%"} />
      </div>
      <div className={styles.logoWrapper}>
        <img src={BoseIcon} alt={""} width={"100%"} />
      </div>
      <div className={styles.logoWrapper}>
        <img src={WalmartIcon} alt={""} width={"100%"} />
      </div>
      <div className={styles["mobile-bottom-text"]}>
        <h4>Мы работаем с лучшими</h4>
        <p>
          Наши решения представлены в 30 странах мира: от Австралии до Мексики,
          от Африки до Тайланда. Нам доверяют, нас ценят.
        </p>
      </div>
    </div>
  );
};

export default Partners;
