import styles from "./AboutUs.module.scss";
import WideButton from "@SharedUI/WideButton/WideButton.tsx";
import Team from "@/pages/AboutUs/Team/Team.tsx";
import { ScrollRestoration } from "react-router-dom";
import InDigits from "@/pages/AboutUs/InDigits/InDigits";
import Features from "@/SharedUI/Features/Features";
import Image1 from "@assets/images/about-us-image1.webp";
import Image2 from "@assets/images/about-us-image2.webp";
import Image3 from "@assets/images/about-us-image3.webp";
import Image4 from "@assets/images/about-us-image4.webp";
import useWindowSize from "@/hooks/useWindowSize";
import MobileFeatures from "@SharedUI/Features/MobileFeatures";

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

const FEATURES = [
  {
    title: "Зарождение идеи",
    description: [
      "Наша компания, Nordic Solar, была основана в 2018 году с ясной миссией: внести значительный вклад в борьбу с изменением климата и создать более устойчивое будущее для всех. Идея родилась из стремления основателей найти реальные и практические решения для глобальных энергетических проблем, возникших из-за исчерпания традиционных невозобновляемых источников энергии и их пагубного воздействия на окружающую среду.",
    ],
    image: Image1
  },
  {
    title: "Почему мы появились",
    description: [
      "Идея создания компании возникла у группы инженеров и экологов, которые были обеспокоены быстрым ухудшением экологической ситуации на планете. Видя, как использование ископаемого топлива приводит к разрушительным последствиям, они решили объединить свои усилия и знания для разработки и внедрения инновационных решений в области зеленой энергетики.",
    ],
    image: Image2
  },
  {
    title: "Наша миссия",
    description: [
      "Наша миссия заключается в том, чтобы содействовать устойчивому развитию и обеспечивать будущее нашей планеты за счет инвестиций в возобновляемые источники энергии. Мы стремимся минимизировать углеродный след, поддерживая экологические инициативы и предоставляя нашим клиентам надежные и выгодные инвестиционные возможности в зеленую энергетику.",
    ],
    image: Image3
  },
  {
    title: "Наше видение",
    description: [
      "Мы видим будущее, где энергия производится исключительно из экологически чистых и возобновляемых источников. Нашей целью является лидерство на глобальном рынке зеленой энергетики, внедрение инновационных технологий и развитие устойчивых энергетических решений. Мы стремимся вдохновить другие компании и общество на переход к зеленой энергетике, способствуя глобальному снижению выбросов парниковых газов и улучшению качества жизни людей по всему миру.",
    ],
    image: Image4
  },
];
const IMAGES = [Image1, Image2, Image3, Image4];

const AboutUs = () => {
  const windowSize = useWindowSize();
  const isMobile = windowSize.width < 900;

  return (
    <>
      <div className={`${styles["about-us"]} container`}>
        <h2 className={"page-title"}>О компании</h2>
        <WideButton text={"Обсудить сотрудничество"} />
        <p className={styles["expert-text"]}>
          Эксперты в солнечной энергетике, и сфере альтернативного питания
        </p>
        <div className={styles["tabs"]}>
          {isMobile ? (
            <MobileFeatures features={FEATURES} />
          ) : (
            <Features features={FEATURES} images={IMAGES} />
          )}
        </div>
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
        <div className={styles["slider"]}>
          <InDigits />
        </div>
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
