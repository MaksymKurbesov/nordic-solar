import styles from "./AboutUs.module.scss";
import WideButton from "@SharedUI/WideButton/WideButton.tsx";
import Team from "@/pages/AboutUs/Team/Team.tsx";
import { ScrollRestoration } from "react-router-dom";

const GOALS = [
  {
    title: "Расширение глобального присутствия",
    description:
      "Увеличение числа наших проектов в разных регионах мира, чтобы больше стран могли перейти на использование возобновляемых источников энергии",
  },
  {
    title: "Инновации и исследования",
    description:
      "Постоянное совершенствование технологий производства и хранения зеленой энергии, внедрение новых решений, которые делают зеленую энергию доступной и экономически выгодной",
  },
  {
    title: "Образование и осведомленность",
    description:
      "Повышение осведомленности общества о важности перехода на возобновляемые источники энергии, проведение образовательных программ и сотрудничество с правительствами и НПО",
  },
  {
    title: "Устойчивое развитие",
    description:
      "Продолжение работы над проектами, которые минимизируют углеродный след и способствуют устойчивому развитию сообществ",
  },
];

const AboutUs = () => {
  return (
    <>
      <div className={`${styles["about-us"]} container`}>
        <h2 className={"page-title"}>О компании</h2>
        <WideButton text={"Обсудить сотрудничество"} />
        <p className={styles["expert-text"]}>
          Эксперты в солнечной энергетике, и сфере альтернативного питания
        </p>
        <div className={styles["tabs"]}>tabs</div>
        <h3 className={styles["text-after-tabs"]}>
          <span>Мы стремимся не только</span> продолжать расширение и улучшение
          наших текущих проектов, <span>но и ставим перед собой</span>{" "}
          амбициозные цели <span>на будущее</span>
        </h3>
        <div className={styles["goals"]}>
          <h4>Наши цели</h4>
          <ul>
            {GOALS.map((goal, index) => {
              return (
                <li key={goal.title} className={styles["goal"]}>
                  <span className={styles["goal-number"]}>{index + 1}</span>
                  <h5>{goal.title}</h5>
                  <p>{goal.description}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles["slider"]}>slider</div>
        <Team />
        <p className={styles["text-after-team"]}>
          <span>Nordic Solar верит в будущее, где</span>{" "}
          <span className={styles["green"]}>чистая энергия</span>
          <br /> станет стандартом, а не исключением
        </p>
        <div className={styles["text-after-team2"]}>
          <p>
            Мы гордимся своим вкладом в создание этого будущего и приглашаем вас
            присоединиться к нам на этом пути
          </p>
        </div>
      </div>
      <ScrollRestoration />
    </>
  );
};

export default AboutUs;
