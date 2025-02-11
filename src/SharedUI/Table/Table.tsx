import styles from "./Table.module.scss";
import useWindowSize from "@/hooks/useWindowSize";
import "swiper/css/effect-creative";

const STATUS_MAP = {
  Выполнено: "success",
  Ожидание: "pending",
  Отменено: "canceled",
};

const Table = ({ columns, data, isDeposit }) => {
  const windowSize = useWindowSize();
  const isMobile = windowSize.width < 1200;

  const columnsLength = isMobile && isDeposit ? 7 : columns.length;
  const gridColumns = `repeat(${columnsLength}, 1fr)`;

  if (!data) return;

  return (
    <ul className={styles["table-list"]}>
      <li className={styles["header"]} style={{ gridTemplateColumns: gridColumns }}>
        {columns.map((column) => (
          <p key={column.title}>{column.title}</p>
        ))}
      </li>
      {data.map((item, index) => {
        return (
          <li key={index} className={`${styles["table-row"]}`} style={{ gridTemplateColumns: gridColumns }}>
            {columns.map((column, index) => {
              console.log(item.color, "item.color");

              return (
                <div key={index} className={styles["cell"]}>
                  <span className={styles["label"]}>{column.title}</span>
                  <div
                    key={column.key}
                    className={column.key === "status" ? styles[item.color] : styles["table-div"]}
                  >
                    {column.key === "nextAccrual" && !item.isActive ? <p>Выполнено</p> : item[column.key]}
                  </div>
                </div>
              );
            })}
          </li>
        );
      })}
    </ul>
  );
};

export default Table;
