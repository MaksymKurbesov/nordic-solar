import styles from "./Deposits.module.scss";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import DepositsList from "@/pages/Cabinet/MainCabinet/Deposits/DepositsList/DepositsList.tsx";
import { useEffect, useState } from "react";
import { IDeposit } from "@/interfaces/IUser.ts";
import { useOutletContext } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { useTranslation } from "react-i18next";

export interface IDepositColumn {
  title: string;
  key: string;
}

const getDepositColumns = (t): IDepositColumn[] => {
  return [
    {
      title: t("variant"),
      key: "variant",
    },
    {
      title: t("progress"),
      key: "progress",
    },
    {
      title: t("accrual"),
      key: "nextAccrual",
    },
    {
      title: t("amount"),
      key: "amount",
    },
    {
      title: t("will_received"),
      key: "willReceived",
    },

    {
      title: t("received"),
      key: "received",
    },
    {
      title: t("method_pay"),
      key: "wallet",
    },
    {
      title: t("openDate"),
      key: "openDate",
    },
    {
      title: t("closeDate"),
      key: "closeDate",
    },
  ];
};

const Deposits = ({ deposits }: { deposits: IDeposit[] }) => {
  const { t } = useTranslation("cabinet");
  const [activeDeposits, setActiveDeposits] = useState<IDeposit[]>([]);
  const [completedDeposits, setCompletedDeposits] = useState<IDeposit[]>([]);
  const [isDepositLoading] = useOutletContext<[isDepositLoading: boolean]>();
  const depositColumns = getDepositColumns(t);

  useEffect(() => {
    if (!deposits) return;

    const active = deposits.filter((item) => item.isActive);
    const completed = deposits.filter((item) => !item.isActive);

    setActiveDeposits(active);
    setCompletedDeposits(completed);
  }, [deposits]);

  return (
    <div className={styles["deposits"]}>
      <Tabs defaultFocus>
        <TabList className={styles["deposits-buttons"]}>
          <Tab className={styles["tab"]} selectedClassName={styles["selected-tab"]}>
            {t("active_deposits")}
          </Tab>
          <Tab className={styles["tab"]} selectedClassName={styles["selected-tab"]}>
            {t("ended_deposits")}
          </Tab>
        </TabList>
        <TabPanel>
          {isDepositLoading ? (
            <div className={styles["skeletons"]}>
              <Skeleton animation="wave" height={210} />
              <Skeleton animation="wave" height={210} />
            </div>
          ) : activeDeposits.length === 0 ? (
            t("no_active_deposits")
          ) : (
            <DepositsList isActive deposits={activeDeposits} columns={depositColumns} />
          )}
        </TabPanel>
        <TabPanel>
          {completedDeposits.length === 0 ? (
            t("no_ended_deposits")
          ) : (
            <DepositsList deposits={completedDeposits} columns={depositColumns} isActive={false} />
          )}
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Deposits;
