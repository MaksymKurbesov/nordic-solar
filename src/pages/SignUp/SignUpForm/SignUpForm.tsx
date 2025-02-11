import styles from "./SignUpForm.module.scss";
import Input from "@SharedUI/Input/Input.tsx";
import { FieldValues, SubmitHandler, useFormContext } from "react-hook-form";
import WideButton from "@SharedUI/WideButton/WideButton.tsx";
import { useTranslation } from "react-i18next";

type ISignUpFormProps<T extends FieldValues> = {
  onSubmit: SubmitHandler<T>;
  handleOpenAgreement: () => void;
  isLoading: boolean;
};

const SignUpForm = <T extends FieldValues>({
  onSubmit,
  handleOpenAgreement,
  isLoading,
}: ISignUpFormProps<T>) => {
  const { t } = useTranslation("login");
  const methods = useFormContext<T>();
  const {
    handleSubmit,
    trigger,
    register,
    formState: { errors },
  } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
      <div className={styles["input-wrapper"]}>
        <Input
          name={"nickname"}
          label={`${t("nickname")}*`}
          register={register}
          trigger={trigger}
          validation={{
            required: t("nickname_error"),
            minLength: { value: 5, message: t("min_5") },
          }}
        />
        {errors.nickname && <p className={styles["error"]}>{`${errors.nickname.message}`}</p>}
      </div>

      <div className={styles["input-wrapper"]}>
        <Input
          type={"password"}
          name={"password"}
          label={`${t("password")}*`}
          register={register}
          validation={{
            required: t("password_error"),
            minLength: { value: 6, message: t("min_6") },
          }}
          trigger={trigger}
        />
        {errors.password && <p className={styles["error"]}>{`${errors.password.message}`}</p>}
      </div>
      <div className={styles["input-wrapper"]}>
        <Input
          type={"password"}
          name={"confirm-password"}
          label={`${t("confirm_pass")}*`}
          register={register}
          trigger={trigger}
          validation={{
            required: t("confirm_pass_error"),
            validate: (value: string) => value === methods.getValues("password") || t("password_dont_match"),
          }}
        />
        {errors["confirm-password"] && (
          <p className={styles["error"]}>{`${errors["confirm-password"].message}`}</p>
        )}
      </div>
      <div className={styles["input-wrapper"]}>
        <Input
          name={"email"}
          label={"E-mail*"}
          register={register}
          trigger={trigger}
          validation={{
            required: t("email_error"),
            pattern: {
              value: /^\s*[^@ ]+@[^@ ]+\.[^@ .]{2,}\s*$/,
              message: t("wrong_email"),
            },
          }}
        />
        {errors.email && <p className={styles["error"]}>{`${errors.email.message}`}</p>}
      </div>
      <Input name={"referredBy"} label={t("referral")} register={register} trigger={trigger} />

      <div className={styles["input-wrapper"]}>
        <label className={`${styles["container"]} ${styles["agreement"]}`}>
          <input
            type="checkbox"
            {...register("agreement", {
              required: t("rules_error"),
            })}
          />
          <span className={styles["checkmark"]}></span>
          {t("agree")}{" "}
          <button
            onClick={(e) => {
              e.preventDefault();
              handleOpenAgreement();
            }}
            className={styles["read-rules"]}
          >
            {t("read_rules")}
          </button>
        </label>
        {errors.agreement && <p className={styles["error"]}>{`${errors.agreement.message}`}</p>}
      </div>
      <WideButton text={t("register")} type={"submit"} isDisabled={isLoading} />
    </form>
  );
};

export default SignUpForm;
