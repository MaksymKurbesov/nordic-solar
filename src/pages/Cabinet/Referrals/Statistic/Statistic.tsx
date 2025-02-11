import styles from "./Statistic.module.scss";
import LinkIcon from "@assets/icons/link.svg?react";
import PartnersIcon from "@assets/icons/partners.svg?react";
import ActivePartnersIcon from "@assets/icons/active-partners.svg?react";
import StructureAmountIcon from "@assets/icons/structure-amount.svg?react";
import DateIcon from "@assets/icons/date.svg?react";
import CopyIcon from "@assets/icons/copy.svg?react";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser.ts";
import { getActiveReferralsCount, getReferralsCount, getTotalStructureInvested } from "@/utils/helpers.tsx";
import { FC, useEffect, useState } from "react";
import { IReferrals } from "@/pages/Cabinet/Referrals/Referrals.tsx";
import { useTranslation } from "react-i18next";

interface IStatisticProps {
  referrals: IReferrals | {};
}

const Statistic: FC<IStatisticProps> = ({ referrals }) => {
  const { t } = useTranslation("referrals");
  const { user } = useUser();
  const [referralsCount, setReferralsCount] = useState(0);
  const [activeReferralsCount, setActiveReferralsCount] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  const CopyNotify = () => toast.success(t("copy"));

  useEffect(() => {
    if (!referrals) return;

    setReferralsCount(getReferralsCount(referrals));
    setActiveReferralsCount(getActiveReferralsCount(referrals));
    setTotalIncome(getTotalStructureInvested(referrals));
  }, [referrals]);

  if (!user) {
    return <div>{t("loading")}</div>;
  }

  return (
    <div className={styles["referrals"]}>
      <div className={styles["referral-link"]}>
        <div className={styles["icon-wrapper"]}>
          <span className={styles["icon"]}>
            <LinkIcon />
          </span>
          <p>{t("invite_link")}</p>
        </div>
        <p
          className={styles["link"]}
          onClick={() => {
            CopyNotify();
            navigator.clipboard.writeText(`https://nordic-solar.tech/sign-up?referral=${user.nickname}`);
          }}
        >
          {`https://nordic-solar.tech/sign-up?referral=${user.nickname}`} <CopyIcon />
        </p>
      </div>
      <div className={styles["statistic"]}>
        <span className={styles["icon"]}>
          <PartnersIcon />
        </span>
        <p>{t("partners_count")}</p>
        <p className={styles["value"]}>{referralsCount}</p>
      </div>
      <div className={styles["statistic"]}>
        <span className={styles["icon"]}>
          <ActivePartnersIcon />
        </span>
        <p>{t("active_partners_count")}</p>
        <p className={styles["value"]}>{activeReferralsCount}</p>
      </div>
      <div className={styles["statistic"]}>
        <span className={styles["icon"]}>
          <StructureAmountIcon />
        </span>
        <p>{t("structure_income")}</p>
        <p className={styles["value"]}>${totalIncome}</p>
      </div>
      <div className={styles["statistic"]}>
        <span className={styles["icon"]}>
          <DateIcon />
        </span>
        <p>{t("invited")}</p>
        <p className={styles["value"]}>{user.referredBy}</p>
      </div>
    </div>
  );
};

export default Statistic;
