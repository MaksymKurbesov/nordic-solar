import Hero from "@/pages/IndexPage/Hero/Hero.tsx";
import styles from "./IndexPage.module.scss";
import WeBelieve from "@/pages/IndexPage/WeBelieve/WeBelieve.tsx";
import Features from "@/SharedUI/Features/Features.tsx";
import Advantages from "@/pages/IndexPage/Advantages/Advantages.tsx";
import OfferBanner from "@/pages/IndexPage/OfferBanner/OfferBanner.tsx";
import Roadmap from "@/pages/IndexPage/Roadmap/Roadmap.tsx";
import ContactUs from "@SharedUI/ContactUs/ContactUs.tsx";
import Partners from "@/pages/IndexPage/Partners/Partners.tsx";
import MobileFeatures from "@/SharedUI/Features/MobileFeatures.tsx";
import useWindowSize from "@/hooks/useWindowSize.ts";
import Image1 from "@assets/images/features-image1.webp";
import Image2 from "@assets/images/features-image2.webp";
import Image3 from "@assets/images/features-image3.webp";
import Image4 from "@assets/images/features-image4.webp";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

export interface IFeature {
  title: string;
  description: string[];
  image: string;
}

const getFeatures = (t): IFeature[] => {
  return [
    {
      title: t("feature1_title"),
      description: [t("feature1_descr1"), t("feature1_descr2"), t("feature1_descr3")],
      image: Image1,
    },
    {
      title: t("feature2_title"),
      description: [t("feature2_descr1"), t("feature2_descr2")],
      image: Image2,
    },
    {
      title: t("feature3_title"),
      description: [t("feature3_descr1"), t("feature3_descr2"), t("feature3_descr3")],
      image: Image3,
    },
    {
      title: t("feature4_title"),
      description: [t("feature4_descr1"), t("feature4_descr2")],
      image: Image4,
    },
  ];
};

const IMAGES = [Image1, Image2, Image3, Image4];

const IndexPage = () => {
  const windowSize = useWindowSize();
  const isMobile = windowSize.width < 900;
  const { t } = useTranslation("indexPage");

  const scrollableRef = useRef<HTMLDivElement>(null);

  const handleScrollDown = () => {
    if (scrollableRef.current) {
      window.scrollTo({
        top: scrollableRef.current.scrollHeight,
        behavior: "smooth", // Для плавной прокрутки
      });
    }
  };

  return (
    <>
      <div className={styles.heroContainer} ref={scrollableRef}>
        <Hero handleScrollDown={handleScrollDown} />
      </div>
      <div className={"container"}>
        <WeBelieve />
        {isMobile ? (
          <MobileFeatures features={getFeatures(t)} />
        ) : (
          <Features features={getFeatures(t)} images={IMAGES} />
        )}
        <Advantages />
        <OfferBanner />
        <Roadmap />
        <ContactUs />
        <Partners />
      </div>
    </>
  );
};

export default IndexPage;
