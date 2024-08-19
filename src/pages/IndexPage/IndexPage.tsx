import Hero from "@/pages/IndexPage/Hero/Hero.tsx";
import styles from "./IndexPage.module.scss";
import WeBelieve from "@/pages/IndexPage/WeBelieve/WeBelieve.tsx";
import Features from "@/pages/IndexPage/Features/Features.tsx";
import Advantages from "@/pages/IndexPage/Advantages/Advantages.tsx";
import OfferBanner from "@/pages/IndexPage/OfferBanner/OfferBanner.tsx";
import Roadmap from "@/pages/IndexPage/Roadmap/Roadmap.tsx";
import ContactUs from "@SharedUI/ContactUs/ContactUs.tsx";
import Partners from "@/pages/IndexPage/Partners/Partners.tsx";
import MobileFeatures from "@/pages/IndexPage/Features/MobileFeatures.tsx";
import useWindowSize from "@/hooks/useWindowSize.ts";

export const IndexPage = () => {
  const windowSize = useWindowSize();
  const isMobile = windowSize.width < 900;

  return (
    <>
      <div className={styles.heroContainer}>
        <Hero />
      </div>
      <div className={"container"}>
        <WeBelieve />
        {isMobile ? <MobileFeatures /> : <Features />}
        <Advantages />
        <OfferBanner />
        <Roadmap />
        <ContactUs />
        <Partners />
      </div>
    </>
  );
};
