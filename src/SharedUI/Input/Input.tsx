import styles from "./Input.module.scss";

const Input = ({ label, name, type = "text", register = () => {} }) => {
  return (
    <div className={styles["input"]}>
      {label && <label htmlFor={name}>{label}</label>}
      <input id={name} type={type} {...register(name)} />
    </div>
  );
};

export default Input;
