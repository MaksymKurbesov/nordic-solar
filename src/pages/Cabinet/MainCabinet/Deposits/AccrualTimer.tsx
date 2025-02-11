import { useTimer } from "react-timer-hook";
import { Timestamp } from "firebase/firestore";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface IAccrualTimer {
  nextAccrual: Timestamp;
}

const AccrualTimer: FC<IAccrualTimer> = ({ nextAccrual }) => {
  const { t } = useTranslation("cabinet");
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp: nextAccrual.toDate(),
    onExpire: () => console.warn("onExpire called"),
  });

  return (
    <p>{`${days ? `${days} ${t("d")}` : ""} ${hours} ${t("h")} ${minutes} ${t("m")} ${seconds} ${t("s")}`}</p>
  );
};

export default AccrualTimer;
