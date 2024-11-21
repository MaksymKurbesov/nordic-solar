import styles from "./MobileFeatures.module.scss";
import Image from "@assets/images/features-image.png";
import Image2 from "@assets/images/feature2.png";
import Image3 from "@assets/images/feature3.png";
import Image4 from "@assets/images/feature4.png";

const FEATURES = [
  {
    title: "Финансирование проектов",
    image: Image,
    description:
      "Прямые инвестиции в проекты по возобновляемым источникам энергии \n" +
      "(солнечная, ветровая, гидроэнергия и т.д.). " +
      "Поддержка стартапов и инновационных технологий в сфере зеленой энергетики. " +
      "Помощь в привлечении внешнего финансирования и грантов.",
  },
  {
    title: "Консультации и анализ",
    image: Image2,
    description:
      "Мы понимаем динамичный характер бизнес-ландшафта. Наша миссия состоит в том, чтобы предоставить вам информацию и стратегии, необходимые для того, чтобы оставаться впереди конкурентного рынка. Благодаря команде опытных консультантов и аналитиков рынка, мы предлагаем индивидуальные решения, разработанные в соответствии с потребностями вашего бизнеса.",
  },
  {
    title: "Управление проектами",
    image: Image3,
    description:
      "Специализируемся на предоставлении первоклассных услуг по управлению проектами, которые гарантируют, что ваши проекты будут завершены своевременно, в рамках бюджета и по самым высоким стандартам качества. Наши опытные менеджеры проектов стремятся помочь вам достичь ваших бизнес-целей путем тщательного планирования, выполнения.",
  },
  {
    title: "Разработка решений",
    image: Image4,
    description:
      "Наша команда опытных специалистов работает над созданием инновационных решений, которые отвечают вашим уникальным требованиям и способствуют достижению бизнеса.",
  },
];

const MobileFeatures = ({ features }) => {
  return (
    <div className={styles["mobile-features"]}>
      <h3>Основные функции и услуги</h3>
      <ul className={styles["mobile-features-list"]}>
        {features.map((feature, index) => {
          return (
            <li key={index}>
              <p className={styles["title"]}>{feature.title}</p>
              <img src={feature.image} alt={""} width={528} />
              <p className={styles["description"]}>{feature.description}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MobileFeatures;
