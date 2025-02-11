import styles from "./Personal.module.scss";
import Input from "@SharedUI/Input/Input.tsx";
import { useFormContext } from "react-hook-form";
import UserAvatar from "@assets/images/user.png";
import { useUser } from "@/hooks/useUser.ts";
import UploadIcon from "@assets/icons/upload.svg?react";
import { useEffect, useState } from "react";
import { auth, userService } from "@/main.tsx";
import { useTranslation } from "react-i18next";

const Personal = () => {
  const { t } = useTranslation("settings");
  const { register, trigger } = useFormContext();
  const { user } = useUser();
  const [userAvatar, setUserAvatar] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!auth.currentUser) return;

    if (auth.currentUser.photoURL) {
      setUserAvatar(auth.currentUser.photoURL);
    } else {
      setUserAvatar(UserAvatar);
    }
  }, []);

  return (
    <>
      <div className={styles["avatar"]}>
        {loading ? <div className={styles["loader"]}></div> : <img src={userAvatar} alt={""} />}
        <div>
          <p className={styles["nickname"]}>{user.nickname}</p>
          <div className={styles["avatar-buttons"]}>
            <input
              {...register("avatar", {
                onChange: async (e) => {
                  setLoading(true);
                  await userService.updateUserAvatar(e.target.files[0], setUserAvatar);
                  setLoading(false);
                },
              })}
              type={"file"}
              id={"upload-avatar"}
              hidden
            />
            <label htmlFor={"upload-avatar"} className={styles["upload-button"]}>
              <UploadIcon width={15} /> {t("edit")}
            </label>
            <button className={styles["delete-button"]}>{t("delete")}</button>
          </div>
        </div>
      </div>
      <div className={styles["inputs"]}>
        <Input label={t("name")} name={"name"} register={register} trigger={trigger} />
        <Input label={t("surname")} name={"surname"} register={register} trigger={trigger} />
        <Input label={"Email"} name={"email"} register={register} trigger={trigger} disabled />
        <Input label={t("phone")} name={"phone"} register={register} trigger={trigger} />
        <Input label={t("social")} name={"social"} register={register} trigger={trigger} />
        <Input label={t("country")} name={"country"} register={register} trigger={trigger} />
      </div>
    </>
  );
};

export default Personal;
