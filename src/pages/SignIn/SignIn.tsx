import styles from "./SignIn.module.scss";
import Input from "@SharedUI/Input/Input.tsx";
import WideButton from "@SharedUI/WideButton/WideButton.tsx";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { auth, userService } from "@/main.tsx";
import { useAuthState } from "@/hooks/useAuthState.ts";
import { useEffect } from "react";

const SignIn = () => {
  const methods = useForm();
  const { register, handleSubmit } = methods;
  const [user, userLoading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/cabinet/main");
  }, [user]);

  const onSubmit = async (data) => {
    await userService.logIn(data.email, data.password);
  };

  if (userLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`${styles["sign-in"]} container`}>
      <h2>Войти</h2>
      <div className={styles["form-wrapper"]}>
        <div className={styles["new-user"]}>
          <p>Новый пользователь?</p>
          <NavLink className={styles["register-link"]} to={"/sign-up"}>
            Создать учетную запись
          </NavLink>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input name={"email"} label={"Email*"} register={register} />
          <Input
            type={"password"}
            name={"password"}
            label={"Пароль*"}
            register={register}
          />
          <WideButton text={"Войти"} type={"submit"} />
        </form>
      </div>
    </div>
  );
};

export default SignIn;
