import styles from "./Roadmap.module.scss";

const Roadmap = () => {
  return (
    <div className={`${styles["roadmap"]}`}>
      <p className={styles["year"]}>2018</p>
      <div className={styles["yearContent"]}>
        <span>01</span>
        <h3>Основание компании</h3>
        <ul>
          <li>
            <span>Q1</span>
            Учреждение компании Nordic Solar в Осло, Норвегия. Разработка
            бизнес-плана и стратегии развития.
          </li>
          <li>
            <span>Q2</span>
            Привлечение начальных инвестиций. Формирование команды экспертов в
            области солнечной энергетики, ветроэнергетики, гидроэлектростанций и
            водородных технологий.
          </li>
          <li>
            <span>Q3</span>
            Запуск первого проекта по установке солнечных панелей в Норвегии.
          </li>
          <li>
            <span>Q4</span>Заключение первых контрактов на поставку солнечной
            энергии.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Roadmap;
