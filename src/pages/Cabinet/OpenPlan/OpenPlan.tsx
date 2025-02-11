import styles from "./OpenPlan.module.scss";
import { FormProvider, useForm } from "react-hook-form";
import { ReactNode, useEffect, useState } from "react";
import ConfirmedPopup from "@SharedUI/ConfirmedPopup/ConfirmedPopup";
import { calculateTotalIncome, hasActiveRestrictions } from "@/utils/helpers";
import { useUser } from "@/hooks/useUser";
import { Box } from "@mui/material";
import Plans from "@/pages/Cabinet/OpenPlan/Plans/Plans";
import WalletAmount from "@/pages/Cabinet/OpenPlan/WalletAmount/WalletAmount";
import Variants from "@/pages/Cabinet/OpenPlan/Variants/Variants";
import OpenPlanConfirm from "@/pages/Cabinet/OpenPlan/OpenPlanConfirm/OpenPlanConfirm";
import MyStepper from "@/pages/Cabinet/OpenPlan/Stepper/Stepper.tsx";
import NavigationButtons from "@/pages/Cabinet/OpenPlan/NavigationButtons";
import { createPortal } from "react-dom";
import { BACKEND_URL, PLAN_VARIANT } from "@/utils/const.tsx";
import toast from "react-hot-toast";
import axios from "axios";
import { IPlanGroup, IPlanOption, IPlanTypes, PlanType, PlanVariant } from "@/interfaces/IPlanVariant.ts";
import { I18nextProvider, useTranslation } from "react-i18next";

export interface IStep {
  title: string;
  component: ReactNode;
  type: string;
}

const getSteps = (t): IStep[] => {
  return [
    {
      title: t("step1_title"),
      component: <Plans />,
      type: "plan",
    },
    {
      title: t("step2_title"),
      component: <Variants />,
      type: "variant",
    },
    {
      title: t("step3_title"),
      component: <WalletAmount />,
      type: "wallet",
    },
    {
      title: t("step4_title"),
      component: <OpenPlanConfirm />,
      type: "final",
    },
  ];
};

export type AccrualKey = keyof typeof ACCRUALS_TYPE_MAP;

const ACCRUALS_TYPE_MAP = {
  Ежедневно: "everyday",
  "В конце срока": "one_time",
} as const;

export interface IPlanForm {
  plan: keyof IPlanTypes;
  variant: keyof IPlanGroup;
  amount: number;
  wallet: string;
}

export interface IPlanData {
  plan: keyof IPlanTypes;
  variant: keyof IPlanGroup;
  amount: number;
  wallet: string;
  planData: IPlanOption;
}

const OpenPlan = () => {
  const { t, i18n } = useTranslation("openPlan");
  const { user } = useUser();
  const [confirmPopupIsOpen, setConfirmPopupIsOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const userHasRestriction = hasActiveRestrictions(user?.restrictions);

  const form = useForm<IPlanForm>({
    defaultValues: {
      plan: "" as keyof IPlanTypes,
      variant: "" as keyof IPlanGroup,
      amount: 0,
      wallet: "",
    },
    mode: "onChange",
  });

  const openPopup = () => {
    window.scrollTo(0, 0);
    setConfirmPopupIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const submitHandler = async (data: IPlanData) => {
    const { amount, variant, plan, wallet, planData } = data;

    const willReceived = calculateTotalIncome(amount, planData.inDay, planData.days);

    const depositData = {
      amount: +amount,
      plan,
      variant,
      days: planData.days,
      wallet,
      willReceived,
      username: user?.nickname,
      accruals: ACCRUALS_TYPE_MAP[planData.accruals],
    };

    openPopup();

    await axios.post(`${BACKEND_URL}/deposits/open-deposit`, depositData);
  };

  const handleNext = () => {
    const plan: PlanType = form.watch("plan");
    const variant = form.watch("variant") as PlanVariant;
    const wallet = form.watch("wallet");
    const amount = form.watch("amount");
    const lastStep = activeStep === getSteps(t).length - 1;

    const isVariantPlanEmpty = activeStep === 1 && !variant;
    const isWalletEmpty = activeStep === 2 && !wallet;
    const isIncorrectAmount = activeStep === 2 && isNaN(amount);

    if (!plan) {
      toast.error(t("plan_type_error"));
      return;
    }

    if (isVariantPlanEmpty) {
      toast.error(t("plan_variant_error"));
      return;
    }

    if (isWalletEmpty) {
      toast.error(t("wallet_error"));
      return;
    }

    if (isIncorrectAmount) {
      toast.error(t("incorrect_amount"));
      return;
    }

    if (activeStep === 2 && wallet) {
      if (!user) return;

      const planData = PLAN_VARIANT[plan][variant];

      const userBalance = user.wallets[wallet].available;
      if (userBalance < amount || amount < planData.minDeposit) {
        toast.error(t("no_amount"));
        return;
      }
    }

    if (lastStep) {
      const planData = PLAN_VARIANT[plan][variant];

      submitHandler({ amount, planData, plan, wallet, variant });
      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  return (
    <I18nextProvider i18n={i18n} defaultNS={"openPlan"}>
      <Box sx={{ width: "100%" }} className={styles["open-plan-box"]}>
        <h2>{t("open_plan")}</h2>
        <MyStepper steps={getSteps(t)} activeStep={activeStep} />
        <div className={styles["open-plan"]}>
          <FormProvider {...form}>{getSteps(t)[activeStep].component}</FormProvider>
          {confirmPopupIsOpen && createPortal(<ConfirmedPopup />, document.body)}
        </div>
        <NavigationButtons
          activeStep={activeStep}
          handleBack={handleBack}
          handleNext={handleNext}
          steps={getSteps(t)}
          userHasRestriction={userHasRestriction}
        />
      </Box>
    </I18nextProvider>
  );
};

export default OpenPlan;
