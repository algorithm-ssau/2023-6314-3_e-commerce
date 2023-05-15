import styles from "./NewProducts.module.css";
import { Product } from "./Product";

export const NewProducts = () => {
  return (
    <>
      <div className={styles.flexHeader}>
        <p className={styles.p4}>Наши новинки</p>
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
