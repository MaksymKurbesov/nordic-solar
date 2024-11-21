import styles from "./ContactUs.module.scss";
import WideButton from "@SharedUI/WideButton/WideButton.tsx";
import { NavLink } from 'react-router-dom';

const ContactUs = () => {
  return (
    <div className={`${styles.contactUs}`}>
      <h2>
        Мы вас <br /> заинтересовали?
      </h2>
      <NavLink target="_blank" to={"/contacts"}>
        <WideButton text={"Связаться с нами"} />
      </NavLink>
      <p className={styles.subtitle}>
        Эксперты в солнечной энергетике, и сфере альтернативного питания <br />
        <span>
          Мы верим в мир, в котором чистая, возобновляемая энергия питает наши
          дома и предприятия
        </span>
      </p>
    </div>
  );
};

export default ContactUs;
