import styles from "./OfferBanner.module.scss";
import { CircleButton } from "@SharedUI/CirlceButton/CircleButton.tsx";

const OfferBanner = () => {
  return (
    <div className={`${styles.offerBannerWrapper}`}>
      <div className={`${styles.offerBanner}`}>
        <h2>
          Прямые инвестиции в проекты по <br />{" "}
          <span>возобновляемым источникам энергии</span>
        </h2>
        <CircleButton text={"Смотреть предложения"} cn={"offer-button"} />
      </div>
    </div>
  );
};

export default OfferBanner;
