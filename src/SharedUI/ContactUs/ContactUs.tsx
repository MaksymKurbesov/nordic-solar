import styles from "./ContactUs.module.scss";
import WideButton from "@SharedUI/WideButton/WideButton.tsx";

const ContactUs = () => {
  return (
    <div className={`${styles.contactUs}`}>
      <h2>
        Мы вас <br /> заинтересовали?
      </h2>
      <WideButton text={"Связаться с нами"} />
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
