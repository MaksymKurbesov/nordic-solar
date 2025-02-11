import styles from "./Product.module.scss";
import WideButton from "@SharedUI/WideButton/WideButton";
import Questions from "@/pages/Products/Product/Questions/Questions";
import { useLocation, ScrollRestoration, useNavigate } from "react-router-dom";
import { getProducts } from "@/utils/PRODUCTS";
import { I18nextProvider, useTranslation } from "react-i18next";

const Product = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const productName = location.pathname.split("/")[2];
  const { t, i18n } = useTranslation("products");

  const product = getProducts(t).find((product) => product.link === productName)!;

  const { title, subtitle, heroImage, mainText, subText, galleryImages } = product;

  return (
    <I18nextProvider i18n={i18n} defaultNS={"products"}>
      <div className={"container"}>
        <div className={styles["product"]}>
          <button onClick={() => navigate("/products")} className={styles["back-button"]}>
            {t("back")}
          </button>
          <h2 className={"page-title"}>{title}</h2>
          <WideButton text={t("discuss")} />
          <p className={styles["subtitle"]}>{subtitle}</p>
          <img className={styles["hero-image"]} src={heroImage} alt={""} width={"100%"} />
          <p className={styles["main-text"]}>{mainText}</p>
          <p className={styles["sub-text"]}>{subText}</p>
          <div className={styles["gallery"]}>
            <img src={galleryImages[0]} alt={""} />
            <div>
              <img src={galleryImages[1]} alt={""} />
              <img src={galleryImages[2]} alt={""} />
            </div>
          </div>
          <Questions questions={product.questions} />
        </div>
        <ScrollRestoration />
      </div>
    </I18nextProvider>
  );
};

export default Product;
