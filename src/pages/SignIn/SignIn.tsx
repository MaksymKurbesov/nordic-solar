import styles from "./SignIn.module.scss";
import Input from "@SharedUI/Input/Input.tsx";
import WideButton from "@SharedUI/WideButton/WideButton.tsx";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { userService } from "@/main.tsx";
import { useEffect, useState } from "react";
import { useFirebaseUser } from "@/context/AuthContext.tsx";

interface ISignInData {
  email: string;
  password: string;
}

const SignIn = () => {
  const methods = useForm<ISignInData>();
  const { register, handleSubmit, trigger } = methods;
  const { user, isLoading } = useFirebaseUser();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate("/cabinet/main");
  }, [user]);

  const onSubmit = async (data: ISignInData) => {
    setLoading(true);
    await userService.logIn(data.email, data.password, setError);
    setLoading(false);
  };

  if (isLoading) {
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
          <Input trigger={trigger} name={"email"} label={"Email*"} register={register} />
          <Input type={"password"} name={"password"} label={"Пароль*"} register={register} trigger={trigger} />
          {error && <p className={styles["error"]}>{error}</p>}
          <WideButton isDisabled={loading} text={"Войти"} type={"submit"} />
        </form>
      </div>
    </div>
  );
};

export default SignIn;
