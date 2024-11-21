import styles from "./Questions.module.scss";
import { useState } from "react";
import PlusIcon from "@assets/icons/plus.svg?react";



const Questions = ({ questions }) => {
  const [currentCollapseOpen, setCurrentCollapseOpen] = useState<null | number>(
    null,
  );

  const collapseHandler = (collapseIndex: number) => {
    setCurrentCollapseOpen(collapseIndex);

    if (currentCollapseOpen === collapseIndex) {
      setCurrentCollapseOpen(null);
    }
  };

  return (
    <div className={styles["questions"]}>
      <p className={styles["title"]}>Наиболее популярные вопросы</p>
      <div className={styles["collapses"]}>
        {questions.map((question, index) => {
          return <div key={index}
            className={`${styles["collapse"]} ${currentCollapseOpen === index ? styles["collapseOpen"] : "collapse"}`}
            onClick={() => collapseHandler(index)}
          >
            <h3>
              {question.title}
              <button>
                <PlusIcon />
              </button>
            </h3>
            <p>
              {question.answer}
            </p>
          </div>
        })}
      </div>
    </div>
  );
};

export default Questions;
