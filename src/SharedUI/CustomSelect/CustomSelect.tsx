import { useEffect, useState } from "react";
import RuFlag from "@assets/images/ru-flag.svg";
import EnFlag from "@assets/images/us-flag.svg";
import styles from "./CustomSelect.module.scss";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";

const getLang = (code) => {
  return languages.find((lang) => lang.code === code);
};

const languages = [
  { code: "en", name: "English", flag: EnFlag },
  { code: "ru", name: "Russian", flag: RuFlag },
];

const selectVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.5 },
  }),
};

const CustomSelect = () => {
  const localStorageLanguage = localStorage.getItem("language") || "en";
  const [selectedLang, setSelectedLang] = useState(getLang(localStorageLanguage));
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();

  const handleChange = (lang) => {
    setSelectedLang(lang);
    setIsOpen(false);
    i18n.changeLanguage(lang.code);
    localStorage.setItem("language", lang.code);
  };

  useEffect(() => {
    const language = localStorage.getItem("language") || "en";
    setSelectedLang(getLang(language));
    i18n.changeLanguage(language);
  }, []);

  return (
    <motion.div variants={selectVariants} custom={1.2} className={styles["custom-select"]}>
      <div className={styles["select-wrapper"]} onClick={() => setIsOpen(!isOpen)}>
        <img src={selectedLang.flag} alt={selectedLang.name} width="20" />
        <span style={{ marginLeft: "10px" }}>{selectedLang.name}</span>
      </div>
      {isOpen && (
        <ul className={styles["language-list"]}>
          {languages.map((lang) => (
            <li
              key={lang.code}
              onClick={() => {
                handleChange(lang);
              }}
            >
              <img src={lang.flag} alt={lang.name} width="20" />
              <span style={{ marginLeft: "10px" }}>{lang.name}</span>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};

export default CustomSelect;
