import styles from "./Features.module.scss";
import Image from "@assets/images/features-image.png";

const Features = () => {
  return (
    <div className={`${styles.features}`}>
      <img src={Image} alt={""} height={"100%"} width={"100%"} />
      <div className={styles.featuresWrapper}>
        <h3>Основные функции и услуги</h3>
        <ul className={styles.featuresList}>
          <li>Финансирование проектов</li>
          <li>Консультации и анализ</li>
          <li>Управление проектами</li>
          <li>Разработка решений</li>
        </ul>
        <ul className={styles.featuresContent}>
          <li>
            Прямые инвестиции в проекты по возобновляемым источникам энергии
            <br />
            <span>(солнечная, ветровая, гидроэнергия и т.д.)</span>.
          </li>
          <li>
            Поддержка стартапов и инновационных технологий в сфере зеленой
            энергетики.
          </li>
          <li>Помощь в привлечении внешнего финансирования и грантов.</li>
        </ul>
      </div>
    </div>
  );
};

export default Features;
