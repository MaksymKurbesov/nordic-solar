import styles from "./Referrals.module.scss";
import LinkIcon from "@assets/icons/link.svg?react";
import PartnersIcon from "@assets/icons/partners.svg?react";
import ActivePartnersIcon from "@assets/icons/active-partners.svg?react";
import StructureAmountIcon from "@assets/icons/structure-amount.svg?react";
import ReferralClicksIcon from "@assets/icons/referral-clicks.svg?react";
import TestIcon from "@assets/icons/test-icon.svg?react";
import DateIcon from "@assets/icons/date.svg?react";
import CopyIcon from "@assets/icons/copy.svg?react";
import Table from "@SharedUI/Table/Table.tsx";

const STATISTIC = [
  {
    icon: <PartnersIcon />,
    text: "Количество партнеров",
  },
  {
    icon: <ActivePartnersIcon />,
    text: "Количество активных партнеров",
  },
  {
    icon: <StructureAmountIcon />,
    text: "Оборот вашей структуры",
  },
  {
    icon: <ReferralClicksIcon />,
    text: "Переходов по реферальной ссылке",
  },
  {
    icon: <TestIcon />,
    text: "Вас пригласили",
  },
  {
    icon: <DateIcon />,
    text: "Дата регистрации",
  },
];

const REFERRAL_COLUMNS = [
  {
    title: "Уровень",
    key: "level",
  },
  {
    title: "Рефералов",
    key: "total_referrals",
  },
  {
    title: "Активных",
    key: "active_referrals",
  },
  {
    title: "Общий доход",
    key: "total_income",
  },
];

const REFERRAL_DATA = [
  {
    level: 1,
    total_referrals: 5,
    active_referrals: 3,
    total_income: "$4 523",
  },
  {
    level: 2,
    total_referrals: 1,
    active_referrals: 0,
    total_income: "$1 223",
  },
  {
    level: 3,
    total_referrals: 11,
    active_referrals: 5,
    total_income: "$14 523",
  },
  {
    level: 4,
    total_referrals: 15,
    active_referrals: 13,
    total_income: "$24 523",
  },
];

const Referrals = () => {
  return (
    <>
      <div className={styles["referrals"]}>
        <div className={styles["referral-link"]}>
          <div className={styles["icon-wrapper"]}>
            <span className={styles["icon"]}>
              <LinkIcon />
            </span>
            <p>Ссылка для приглашений</p>
          </div>
          <p className={styles["link"]}>
            http://nordic.solar/?user=johndoe <CopyIcon />
          </p>
        </div>
        {STATISTIC.map((item) => {
          return (
            <div className={styles["statistic"]} key={item.text}>
              <span className={styles["icon"]}>{item.icon}</span>
              <p>{item.text}</p>
              <p className={styles["value"]}>10</p>
            </div>
          );
        })}
      </div>
      <div className={styles["referral-levels"]}>
        <Table columns={REFERRAL_COLUMNS} data={REFERRAL_DATA} />
      </div>
    </>
  );
};

export default Referrals;
