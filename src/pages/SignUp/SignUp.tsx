import styles from "./SignUp.module.scss";
import Input from "@SharedUI/Input/Input.tsx";
import WideButton from "@SharedUI/WideButton/WideButton.tsx";
import { NavLink } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { userService } from "@/main.tsx";

interface IUserData {
  nickname: string;
  email: string;
}

const SignUp = () => {
  const methods = useForm<IUserData>();
  const { register, handleSubmit } = methods;

  const onSubmit = async (data: IUserData) => {
    const trimmedNickname = data.nickname.trim();
    const trimmedEmail = data.email.trim();

    await userService.registerUser(
      trimmedNickname,
      trimmedEmail,
      data.password,
    );
  };

  return (
    <div className={`${styles["sign-up"]} container`}>
      <h2>Регистрация</h2>
      <div className={styles["form-wrapper"]}>
        <div className={styles["new-user"]}>
          <p>Уже зарегистрированы?</p>
          <NavLink className={styles["sign-in-link"]} to={"/sign-in"}>
            Войти
          </NavLink>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input name={"nickname"} label={"Никнейм*"} register={register} />
            <Input
              type={"password"}
              name={"password"}
              label={"Пароль*"}
              register={register}
            />
            <Input
              type={"password"}
              name={"confirm-password"}
              label={"Повторите пароль*"}
              register={register}
            />
            <Input name={"email"} label={"E-mail*"} register={register} />
            <Input
              name={"referral"}
              label={"Ник реферала"}
              register={register}
            />
            <div>
              <input type={"checkbox"} id={"agreement"} />
              <label id={"agreement"}>Я согласен с правилами сайта</label>
            </div>

            <WideButton text={"Регистрация"} type={"submit"} />
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default SignUp;
