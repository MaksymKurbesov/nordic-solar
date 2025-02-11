import styles from "./Questions.module.scss";
import { FC, useState } from "react";
import PlusIcon from "@assets/icons/plus.svg?react";
import { IQuestion } from "@/utils/PRODUCTS.tsx";
import { useTranslation } from "react-i18next";

interface IQuestionsProps {
  questions: IQuestion[];
}

const Questions: FC<IQuestionsProps> = ({ questions }) => {
  const [currentCollapseOpen, setCurrentCollapseOpen] = useState<null | number>(null);
  const { t, i18n } = useTranslation("products");

  const collapseHandler = (collapseIndex: number) => {
    setCurrentCollapseOpen(collapseIndex);

    if (currentCollapseOpen === collapseIndex) {
      setCurrentCollapseOpen(null);
    }
  };

  return (
    <div className={styles["questions"]}>
      <p className={styles["title"]}>{t("popular_questions")}</p>
      <div className={styles["collapses"]}>
        {questions.map((question, index) => {
          return (
            <div
              key={index}
              className={`${styles["collapse"]} ${currentCollapseOpen === index ? styles["collapseOpen"] : "collapse"}`}
              onClick={() => collapseHandler(index)}
            >
              <h3>
                {question.title}
                <button>
                  <PlusIcon />
                </button>
              </h3>
              <p>{question.answer}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Questions;
