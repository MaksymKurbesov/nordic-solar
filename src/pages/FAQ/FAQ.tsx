import styles from "./FAQ.module.scss";
import WideButton from "@SharedUI/WideButton/WideButton.tsx";
import ContactUs from "@SharedUI/ContactUs/ContactUs.tsx";
import { useEffect, useRef, useState } from "react";
import useWindowSize from "@/hooks/useWindowSize";
import { ScrollRestoration } from "react-router-dom";
import { I18nextProvider, Trans, useTranslation } from "react-i18next";

const getFAQ = (t) => {
  const totalQuestions = 17; // Общее количество вопросов
  const faq = [];

  for (let i = 1; i <= totalQuestions; i++) {
    faq.push({
      question: t(`question${i}`),
      answer: t(`question${i}_answer`),
    });
  }

  return faq;
};

const FAQ = () => {
  const [openedQuestion, setOpenedQuestion] = useState<number | null>(null);
  const windowSize = useWindowSize();
  const isMobile = windowSize.width < 1200;
  const { t, i18n } = useTranslation("faq");

  const contentRefs = useRef<HTMLElement[]>([]);
  const questionHeight = isMobile ? 70 : 87;

  useEffect(() => {
    // Обновляем maxHeight после рендера, когда вопрос открыт
    contentRefs.current.forEach((ref, index) => {
      if (ref && index === openedQuestion) {
        ref.style.height = ref.scrollHeight + "px";
      }
    });
  }, [openedQuestion]);

  return (
    <I18nextProvider i18n={i18n} defaultNS={"faq"}>
      <div className={`${styles["faq"]} container`}>
        <h2 className={"page-title"}>{t("faq")}</h2>
        <WideButton text={t("consultation")} />
        <p className={styles["subtitle"]}>
          <Trans i18nKey={"have_question"} components={{ span: <span />, br: <br /> }} />
        </p>
        <div className={styles["questions"]}>
          <h4>{t("most_popular")}</h4>
          <ul className={styles["questions-list"]}>
            {getFAQ(t).map((question, index) => {
              const isOpenedQuestion = openedQuestion === index;

              return (
                <li
                  key={question.question}
                  ref={(el) => (contentRefs.current[index] = el as HTMLLIElement)}
                  className={`${styles["question"]}`}
                  style={{
                    height: isOpenedQuestion ? "none" : isMobile ? questionHeight : 87,
                  }}
                  onClick={() => {
                    if (isOpenedQuestion) {
                      setOpenedQuestion(null);
                    } else {
                      setOpenedQuestion(index);
                    }
                  }}
                >
                  <p className={styles["question-title"]}>
                    <span>{index + 1}</span>
                    {question.question}
                  </p>
                  <p className={styles["answer"]}>{question.answer}</p>
                  <button
                    className={`${styles["toggle-button"]} ${isOpenedQuestion ? styles["opened"] : ""}`}
                  >
                    <span />
                    <span />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <ContactUs />
        <ScrollRestoration />
      </div>
    </I18nextProvider>
  );
};

export default FAQ;
