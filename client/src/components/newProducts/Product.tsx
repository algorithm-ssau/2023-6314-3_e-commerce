import styles from "./Product.module.css";

export const Product = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.productImg}>
          <img src="./newProd1.jpg" alt="" />
          <div className={styles.divNew}>
            <p className={styles.descP}>New</p>
          </div>
        </div>
        <div className={styles.description}>
          <p className={styles.price}>2 800 &#8381;</p>
          <p className={styles.text}>Серьги с жемчугом</p>
        </div>
      </div>
    </>
  );
};
