import { ArrowLeft } from "./Arrows/ArrowLeft";
import { ArrowRight } from "./Arrows/ArrowRight";
import styles from "./NewProducts.module.css";
import { Product } from "./Product/Product";

export const NewProducts = () => {
  return (
    <>
      <div className={styles.flexHeader}>
        <p className={styles.p4}>Наши новинки</p>
        <div className={styles.arrows}>
          <ArrowLeft />
          <ArrowRight />
        </div>
        {/* in this place must be added two arrows */}
      </div>
      <div className={styles.products}>
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
    </>
  );
};
