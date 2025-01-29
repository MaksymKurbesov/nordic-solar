import styles from "./Features.module.scss";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { FC, useRef, useState } from "react";
import { IFeature } from "@/pages/IndexPage/IndexPage.tsx";
import { AnimatePresence, motion, useInView } from "motion/react";

interface IFeaturesProps {
  features: IFeature[];
  images: string[];
}

const featuresVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (delay) => ({
    opacity: 1,
    x: 0,
    transition: { delay: delay + 0.5, duration: 0.5 },
  }),
};

const Features: FC<IFeaturesProps> = ({ features, images }) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div className={`${styles.features}`} ref={ref}>
      <Tabs className={styles["tabs"]} selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <AnimatePresence mode="wait">
          <motion.img
            key={tabIndex} // Обновляет анимацию при изменении tabIndex
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className={styles["main-image"]}
            src={images[tabIndex]}
            alt=""
            height="100%"
            width="100%"
          />
        </AnimatePresence>
        <div className={styles["features-wrapper"]}>
          <motion.h3 variants={featuresVariants} custom={0} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            Основные функции и услуги
          </motion.h3>
          <TabList className={styles["features-list"]}>
            {features.map((feature, index) => {
              return (
                <Tab key={feature.title} selectedClassName={styles["selected-tab"]} className={`${styles["tab"]}`}>
                  <motion.p variants={featuresVariants} custom={index * 0.2} initial="hidden" animate={isInView ? "visible" : "hidden"}>
                    {feature.title}
                  </motion.p>
                </Tab>
              );
            })}
          </TabList>
          <div className={styles["features-content"]}>
            {features.map((feature, index) => {
              return (
                <TabPanel key={index}>
                  <ul>
                    {feature.description.map((item) => {
                      return <li key={item}>{item}</li>;
                    })}
                  </ul>
                </TabPanel>
              );
            })}
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default Features;
