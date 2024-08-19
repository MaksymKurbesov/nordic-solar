import styles from "./Products.module.scss";
import ContactUs from "@SharedUI/ContactUs/ContactUs.tsx";
import ProductList from "@/pages/Products/ProductList/ProductList.tsx";

const Products = () => {
  return (
    <div className={`${styles["products"]} container`}>
      <h2 className={"page-title"}>Продукты</h2>
      <p className={styles["subtitle"]}>
        Выберите лучший вариант для вашего бизнеса
      </p>
      <ProductList />
      <ContactUs />
    </div>
  );
};

export default Products;
