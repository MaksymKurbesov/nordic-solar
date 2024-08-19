import styles from "./WeBelieve.module.scss";
import Image from "@assets/images/weBelieve.png";

const WeBelieve = () => {
  return (
    <div className={styles.weBelieve}>
      <h2>
        <span className={styles.gray}>Мы верим в мир, в котором</span>{" "}
        <span className={styles.green}>
          чистая, <br />
          возобновляемая
        </span>{" "}
        энергия питает <br />
        наши дома и предприятия
      </h2>
      <img src={Image} alt={""} />
    </div>
  );
};

export default WeBelieve;
