import styles from "./SignUpForm.module.scss";
import Input from "@SharedUI/Input/Input.tsx";
import { FieldValues, SubmitHandler, useFormContext } from "react-hook-form";
import WideButton from "@SharedUI/WideButton/WideButton.tsx";

type ISignUpFormProps<T extends FieldValues> = {
  onSubmit: SubmitHandler<T>;
  handleOpenAgreement: () => void;
  isLoading: boolean;
};

const SignUpForm = <T extends FieldValues>({ onSubmit, handleOpenAgreement, isLoading }: ISignUpFormProps<T>) => {
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
          label={"Никнейм*"}
          register={register}
          trigger={trigger}
          validation={{
            required: "Никнейм обязателен",
            minLength: { value: 5, message: "Минимум 5 символов" },
          }}
        />
        {errors.nickname && <p className={styles["error"]}>{`${errors.nickname.message}`}</p>}
      </div>

      <div className={styles["input-wrapper"]}>
        <Input
          type={"password"}
          name={"password"}
          label={"Пароль*"}
          register={register}
          validation={{
            required: "Пароль обязателен",
            minLength: { value: 6, message: "Минимум 6 символов" },
          }}
          trigger={trigger}
        />
        {errors.password && <p className={styles["error"]}>{`${errors.password.message}`}</p>}
      </div>
      <div className={styles["input-wrapper"]}>
        <Input
          type={"password"}
          name={"confirm-password"}
          label={"Повторите пароль*"}
          register={register}
          trigger={trigger}
          validation={{
            required: "Подтверждение пароля обязательно",
            validate: (value: string) => value === methods.getValues("password") || "Пароли не совпадают",
          }}
        />
        {errors["confirm-password"] && <p className={styles["error"]}>{`${errors["confirm-password"].message}`}</p>}
      </div>
      <div className={styles["input-wrapper"]}>
        <Input
          name={"email"}
          label={"E-mail*"}
          register={register}
          trigger={trigger}
          validation={{
            required: "E-mail обязателен",
            pattern: {
              value: /^\s*[^@ ]+@[^@ ]+\.[^@ .]{2,}\s*$/,
              message: "Неверный формат E-mail",
            },
          }}
        />
        {errors.email && <p className={styles["error"]}>{`${errors.email.message}`}</p>}
      </div>
      <Input name={"referredBy"} label={"Ник реферала"} register={register} trigger={trigger} />

      <div className={styles["input-wrapper"]}>
        <label className={`${styles["container"]} ${styles["agreement"]}`}>
          <input
            type="checkbox"
            {...register("agreement", {
              required: "Вы должны согласиться с правилами сайта",
            })}
          />
          <span className={styles["checkmark"]}></span>Я согласен с правилами сайта{" "}
          <button
            onClick={(e) => {
              e.preventDefault();
              handleOpenAgreement();
            }}
            className={styles["read-rules"]}
          >
            Читать правила
          </button>
        </label>
        {errors.agreement && <p className={styles["error"]}>{`${errors.agreement.message}`}</p>}
      </div>
      <WideButton text={"Регистрация"} type={"submit"} isDisabled={isLoading} />
    </form>
  );
};

export default SignUpForm;
