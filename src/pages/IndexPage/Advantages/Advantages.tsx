import { motion, useInView } from "motion/react";
import styles from "./Advantages.module.scss";
import { useRef } from "react";

const advantagesData = [
  {
    number: "01",
    title: "Экологическая ответственность",
    description:
      "Поддержка проектов, направленных на сокращение выбросов углерода и улучшение состояния окружающей среды. Содействие устойчивому развитию и переходу к возобновляемым источникам энергии позволяет нашей компании быть частью решения глобальных экологических проблем.",
  },
  {
    number: "02",
    title: "Финансовая привлекательность",
    description:
      "Возможность получения высокой доходности за счет инвестиций в перспективные и быстроразвивающиеся проекты. Инвестирование в зеленую энергетику также помогает диверсифицировать инвестиционный портфель и снизить риски.",
  },
  {
    number: "03",
    title: "Инновации и технологии",
    description:
      "Инвестирование в передовые технологии и стартапы открывает доступ к новым рынкам и возможностям. Наша компания поддерживает исследования и разработки, способствующие развитию энергоэффективных и экологически чистых решений.",
  },
  {
    number: "04",
    title: "Репутация и имидж",
    description:
      "Улучшение корпоративного имиджа за счет участия в экологически и социально значимых проектах. Привлечение внимания и поддержки со стороны клиентов, партнеров и общественности, заботящихся об окружающей среде, укрепляет доверие к нашей компании.",
  },
];

const advantageVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.5 },
  }),
};

const Advantages = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <motion.div
      variants={advantageVariants}
      custom={0.2}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      ref={ref}
      className={styles.advantages}
    >
      <motion.h3>Преимущества</motion.h3>
      <motion.ul className={styles.advantagesList}>
        {advantagesData.map(({ number, title, description }, index) => (
          <motion.li
            key={number}
            variants={advantageVariants}
            custom={index * 0.4}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};

export default Advantages;
