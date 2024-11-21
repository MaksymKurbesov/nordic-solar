import styles from "./OfferBanner.module.scss";
import { CircleButton } from "@SharedUI/CirlceButton/CircleButton.tsx";
import { NavLink } from 'react-router-dom';

const OfferBanner = () => {
  return (
    <div className={`${styles.offerBannerWrapper}`}>
      <div className={`${styles.offerBanner}`}>
        <h2>
          Прямые инвестиции в проекты по <br />{" "}
          <span>возобновляемым источникам энергии</span>
        </h2>
        <NavLink target="_blank" to={"/investments"}>
          <CircleButton text={"Смотреть предложения"} cn={"offer-button"} />
        </NavLink>
      </div>
    </div>
  );
};

export default OfferBanner;
