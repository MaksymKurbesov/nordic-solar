import styles from "./PrivateKey.module.scss";
import { Dispatch, FC, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

interface IPrivateKey {
  privateKey: string;
  setPrivateKey: Dispatch<SetStateAction<string>>;
}

const PrivateKey: FC<IPrivateKey> = ({ privateKey, setPrivateKey }) => {
  const { t } = useTranslation("confirmTransaction");

  return (
    <div className={styles["private-key"]}>
      <div>
        <p>{t("private_key1")}</p>
        <p>{t("private_key2")}</p>
        <p>{t("private_key3")}</p>
      </div>
      <p>{t("private_key4")}</p>
      <input onChange={(e) => setPrivateKey(e.target.value)} value={privateKey} placeholder={""} />
    </div>
  );
};

export default PrivateKey;
