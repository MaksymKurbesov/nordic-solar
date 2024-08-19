import styles from "./Table.module.scss";

const STATUS_MAP = {
  Успешно: "success",
  "В ожидание": "pending",
  Отменено: "canceled",
};

const Table = ({ columns, data }) => {
  const gridColumns = `repeat(${columns.length}, 1fr)`;

  return (
    <ul className={styles["deposits-list"]}>
      <li
        className={styles["header"]}
        style={{ gridTemplateColumns: gridColumns }}
      >
        {columns.map((column) => (
          <p key={column.title}>{column.title}</p>
        ))}
      </li>
      {data.map((item, index) => {
        return (
          <li
            key={index}
            className={styles["deposit"]}
            style={{ gridTemplateColumns: gridColumns }}
          >
            {columns.map((column) => {
              return (
                <p
                  key={column.key}
                  className={
                    column.key === "status"
                      ? styles[STATUS_MAP[item[column.key]]]
                      : ""
                  }
                >
                  {item[column.key]}
                </p>
              );
            })}
          </li>
        );
      })}
    </ul>
  );
};

export default Table;
