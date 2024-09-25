import styles from "./Features.module.scss";
import Image from "@assets/images/features-image.png";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

const Features = () => {
  return (
    <div className={`${styles.features}`}>
      <Tabs className={styles["tabs"]}>
        <img src={Image} alt={""} height={"100%"} width={"100%"} />
        <div className={styles["features-wrapper"]}>
          <h3>Основные функции и услуги</h3>
          <TabList className={styles["features-list"]}>
            <Tab
              selectedClassName={styles["selected-tab"]}
              className={`${styles["tab"]}`}
            >
              Финансирование проектов
            </Tab>
            <Tab
              selectedClassName={styles["selected-tab"]}
              className={`${styles["tab"]}`}
            >
              Консультации и анализ
            </Tab>
            <Tab
              selectedClassName={styles["selected-tab"]}
              className={`${styles["tab"]}`}
            >
              Управление проектами
            </Tab>
            <Tab
              selectedClassName={styles["selected-tab"]}
              className={`${styles["tab"]}`}
            >
              Разработка решений
            </Tab>
          </TabList>
          {/*<ul className={styles.featuresList}>*/}
          {/*  <li>Финансирование проектов</li>*/}
          {/*  <li>Консультации и анализ</li>*/}
          {/*  <li>Управление проектами</li>*/}
          {/*  <li>Разработка решений</li>*/}
          {/*</ul>*/}
          <div className={styles["features-content"]}>
            <TabPanel>
              <ul>
                <li>
                  Прямые инвестиции в проекты по возобновляемым источникам
                  энергии
                  <br />
                  <span>(солнечная, ветровая, гидроэнергия и т.д.)</span>.
                </li>
                <li>
                  Поддержка стартапов и инновационных технологий в сфере зеленой
                  энергетики.
                </li>
                <li>Помощь в привлечении внешнего финансирования и грантов.</li>
              </ul>
            </TabPanel>
            <TabPanel>
              <ul>
                <li>
                  Анализ рынка зеленой энергетики и оценка перспективных
                  проектов.
                </li>
                <li>
                  Консультации по инвестиционным стратегиям и выбору оптимальных
                  проектов для вложений.
                </li>
              </ul>
            </TabPanel>
            <TabPanel>
              <ul>
                <li>
                  Полный цикл управления проектами от начальной идеи до
                  завершения строительства и ввода в эксплуатацию.
                </li>
                <li>Мониторинг и отчетность по ходу выполнения проектов.</li>
                <li>
                  Обеспечение соответствия проектов экологическим и регуляторным
                  требованиям.
                </li>
              </ul>
            </TabPanel>
            <TabPanel>
              <ul>
                <li>
                  Исследования и разработки новых технологий в области
                  возобновляемой энергии.
                </li>
                <li>
                  Консультации по внедрению энергоэффективных решений и снижению
                  углеродного следа.
                </li>
              </ul>
            </TabPanel>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default Features;
