import styles from "./OpenPlan.module.scss";
import { FormProvider, useForm } from "react-hook-form";
import WideButton from "@SharedUI/WideButton/WideButton.tsx";
import {
  Outlet,
  ScrollRestoration,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import { depositService } from "@/main.tsx";

const STEPS = [
  {
    button_text: "Далее",
    link: "/cabinet/open-plan/wallet-amount",
  },
  {
    button_text: "Далее",
    link: "/cabinet/open-plan/variants",
  },
  {
    button_text: "Открыть план",
    link: "/cabinet/open-plan/confirmation",
  },
];

const OpenPlan = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const form = useForm({
    defaultValues: {
      plan: "",
      variant: "",
    },
    mode: "onChange",
  });

  return (
    <div className={styles["open-plan"]}>
      <h2>Открыть план</h2>
      <FormProvider {...form}>
        <Outlet />
      </FormProvider>
      <div className={styles["buttons"]}>
        <WideButton
          isDisabled={location.pathname === "/cabinet/open-plan/plans"}
          text={"Назад"}
          onClickHandler={() => {
            if (step === 0) return;

            navigate(-1);
            setStep((prev) => prev - 1);
          }}
        />
        <WideButton
          text={STEPS[step - 1]?.button_text || "Далее"}
          onClickHandler={async () => {
            if (step >= STEPS.length) {
              console.log("test");
              await depositService.openPlan("_admin", { amount: 123 });
              return;
            }

            setStep((prev) => prev + 1);
            navigate(STEPS[step].link);
          }}
        />
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default OpenPlan;
