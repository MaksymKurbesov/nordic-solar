import styles from "./Questions.module.scss";
import Collapse from "@SharedUI/Collapse/Collapse.tsx";

const Questions = () => {
  return (
    <div className={styles["questions"]}>
      <p className={styles["title"]}>Наиболее популярные вопросы</p>
      <Collapse />
    </div>
  );
};

export default Questions;
