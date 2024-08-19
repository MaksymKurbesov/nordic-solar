import styles from "./CircleButton.module.scss";

interface ICircleButton {
  text: string;
  cn: string;
}

export const CircleButton = ({ text, cn }: ICircleButton) => {
  return (
    <button className={`${styles.circleButton} ${styles[cn]}`}>{text}</button>
  );
};
