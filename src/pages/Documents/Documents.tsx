import styles from "./Documents.module.scss";
import { Button } from "@mui/material";
import { Link, ScrollRestoration } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Documents = () => {
  const { t } = useTranslation("documents");

  return (
    <div className={`${styles["documents"]} container`}>
      <h1>{t("documents")}</h1>
      <p className={styles["subtitle"]}>{t("subtitle")}</p>
      <ul className={styles["documents-list"]}>
        <li>
          <p>Organisasjonsnummer</p>
          <span>{t("register_company")}</span>
          <Link to="/nordic-solar-documents.pdf" target="_blank" download>
            <Button variant="contained">{t("download")}</Button>
          </Link>
        </li>
        <li>
          <p>{t("certificates")}</p>
          <span>{t("certificate")}</span>
          <div className={styles["cert-buttons"]}>
            <Link to="/ISO14001.pdf" target="_blank" download>
              <Button variant="contained">ISO-14001</Button>
            </Link>
            <Link to="/ISO50001.pdf" target="_blank" download>
              <Button variant="contained">ISO-50001</Button>
            </Link>
            <Link to="/climate-bonds-standart.pdf" target="_blank" download>
              <Button variant="contained">Climate bonds standart</Button>
            </Link>
          </div>
        </li>
      </ul>
      <ScrollRestoration />
    </div>
  );
};

export default Documents;
