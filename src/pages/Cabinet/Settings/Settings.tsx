import styles from "./Settings.module.scss";
import Input from "@SharedUI/Input/Input.tsx";
import WideButton from "@SharedUI/WideButton/WideButton.tsx";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

const Settings = () => {
  return (
    <div className={styles["settings"]}>
      <h3>Мои настройки</h3>
      <Tabs focusTabOnClick={false}>
        <TabList className={styles["tab-list"]}>
          <Tab
            className={styles["tab"]}
            selectedClassName={styles["selected-tab"]}
          >
            Личная информация
          </Tab>
          <Tab
            className={styles["tab"]}
            selectedClassName={styles["selected-tab"]}
          >
            Пароль
          </Tab>
          <Tab
            className={styles["tab"]}
            selectedClassName={styles["selected-tab"]}
          >
            Платежные данные
          </Tab>
          <Tab
            className={styles["tab"]}
            selectedClassName={styles["selected-tab"]}
          >
            Безопасность
          </Tab>
        </TabList>

        <TabPanel>
          <div className={styles["inputs"]}>
            <Input label={"Имя"} name={"name"} />
            <Input label={"Фамилия"} name={"surname"} />
            <Input label={"Email"} name={"email"} />
            <Input label={"Телефон"} name={"phone"} />
            <Input label={"Социальная сеть"} name={"social"} />
            <Input label={"Страна"} name={"country"} />
          </div>
        </TabPanel>
        <TabPanel>
          <div className={styles["inputs"]}>
            <Input label={"Старый пароль"} name={"old-password"} />
            <Input label={"Новый пароль"} name={"new-password"} />
            <Input label={"Повторить пароль"} name={"confirm-password"} />
          </div>
        </TabPanel>
        <TabPanel>
          <div className={styles["inputs"]}>
            <Input label={"TRC20 Tether"} name={"trc20-wallet"} />
            <Input label={"TON"} name={"ton-wallet"} />
            <Input label={"Bitcoin"} name={"bitcoin-wallet"} />
            <Input label={"Ethereum"} name={"ethereum-wallet"} />
          </div>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
      </Tabs>

      {/*<ul className={styles["tabs"]}>*/}
      {/*  <li>Личная информация</li>*/}
      {/*  <li>Пароль</li>*/}
      {/*  <li>Платежные данные</li>*/}
      {/*  <li>Безопасность</li>*/}
      {/*</ul>*/}

      <WideButton text={"Сохранить настройки"} isCheckButton />
    </div>
  );
};

export default Settings;
