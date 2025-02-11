import styles from "./Referrals.module.scss";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import LevelAccordion from "@/pages/Cabinet/Referrals/LevelAccordion/LevelAccordion";
import Statistic from "@/pages/Cabinet/Referrals/Statistic/Statistic.tsx";
import axios from "axios";
import { BACKEND_URL } from "@/utils/const.tsx";
import { isObjectEmpty } from "@/utils/helpers.tsx";
import { useTranslation } from "react-i18next";

export interface IReferrals {
  1: IReferral[];
  2: IReferral[];
  3: IReferral[];
  4: IReferral[];
}

export interface IRegistrationDate {
  _seconds: number;
  _nanoseconds: number;
}

export interface IReferral {
  nickname: string;
  sponsor: string;
  referralsCount: number;
  registrationDate: IRegistrationDate;
  invested: number;
  referredTo: IReferrals;
}

const Referrals = () => {
  const { t } = useTranslation("referrals");
  const { user } = useUser();
  const [referrals, setReferrals] = useState<IReferrals | {}>({});

  useEffect(() => {
    if (!user) return;

    const fetchActiveReferrals = async () => {
      const response = await axios.post(`${BACKEND_URL}/user/get-referrals`, {
        nickname: user.nickname,
      });

      const currentUserReferrals = response.data;

      setReferrals(currentUserReferrals);
    };

    fetchActiveReferrals();
  }, [user]);

  if (!user) return;

  return (
    <>
      <h1 className={styles["title"]}>{t("referrals")}</h1>
      <Statistic referrals={referrals} />
      <div className={styles["referral-levels"]}>
        <div className={styles["table-header"]}>
          <span>{t("level")}</span>
          <span>{t("referrals_count")}</span>
          <span>{t("active")}</span>
          <span>{t("total_income")}</span>
        </div>
        {isObjectEmpty(referrals) ? (
          <p>{t("loading")}</p>
        ) : (
          Object.entries(referrals).map((item) => {
            const level = item[0] as keyof IReferral;

            return <LevelAccordion key={level} level={+level} referrals={referrals[level]} />;
          })
        )}
      </div>
    </>
  );
};

export default Referrals;
