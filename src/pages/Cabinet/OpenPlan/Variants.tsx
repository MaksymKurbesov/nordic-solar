import styles from "./OpenPlan.module.scss";
import PlanVariants from "@SharedUI/PlanVariants/PlanVariants.tsx";
import { useFormContext } from "react-hook-form";

const Variants = () => {
  const { register, watch } = useFormContext();
  const selectedVariant = watch("variant");

  console.log(selectedVariant, "selectedVariant");

  return (
    <div className={styles["variants"]}>
      <PlanVariants register={register} selectedVariant={selectedVariant} />
    </div>
  );
};

export default Variants;
