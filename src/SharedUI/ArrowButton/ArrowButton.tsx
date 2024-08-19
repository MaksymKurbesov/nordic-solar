import styles from "./ArrowButton.module.scss";
import ArrowIcon from "@assets/icons/arrow.svg?react";

const ArrowButton = () => {
  return (
    <button className={styles.arrowButton}>
      <ArrowIcon />
    </button>
  );
};

export default ArrowButton;
