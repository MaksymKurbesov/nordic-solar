import styles from "./Products.module.scss";
import ContactUs from "@SharedUI/ContactUs/ContactUs.tsx";
import ProductList from "@/pages/Products/ProductList/ProductList.tsx";
import { ScrollRestoration } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Products = () => {
  const { t } = useTranslation("products");

  return (
    <div className={`${styles["products"]} container`}>
      <h2 className={"page-title"}>{t("products")}</h2>
      <p className={styles["subtitle"]}>{t("subtitle")}</p>
      <ProductList />
      <ContactUs />
      <ScrollRestoration />
    </div>
  );
};

export default Products;
