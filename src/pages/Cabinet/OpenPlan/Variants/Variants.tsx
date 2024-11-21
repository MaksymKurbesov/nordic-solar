import styles from "../OpenPlan.module.scss";
import PlanVariants from '@SharedUI/PlanVariants/PlanVariants.tsx';
import { useFormContext } from "react-hook-form";

const Variants = () => {
  const { register, watch } = useFormContext();
  const selectedPlan = watch("plan");
  const selectedVariant = watch("variant");

  return (
    <div className={styles["variants"]}>
      <PlanVariants register={register} selectedPlan={selectedPlan} selectedVariant={selectedVariant} />
    </div>
  );
};

export default Variants;
