import styles from './Gallery.module.css';

export const Gallery = () => {
  return (
    <div className={styles.grid}>
      <div className={[styles.imageWrapper, styles.image1].join(' ')}>
        <button className={[styles.image, styles.btn1].join(' ')}></button>
        <button className={styles.btn}>Серьги</button>
      </div>
      <div className={[styles.imageWrapper, styles.image2].join(' ')}>
        <button className={[styles.image, styles.btn2].join(' ')}></button>
        <button className={styles.btn}>Колье</button>
      </div>
      <div className={[styles.imageWrapper, styles.image3].join(' ')}>
        <button className={[styles.image, styles.btn3].join(' ')}></button>
        <button className={styles.btn}>Браслеты</button>
      </div>
      <div className={[styles.imageWrapper, styles.image4].join(' ')}>
        <button className={[styles.image, styles.btn4].join(' ')}></button>
        <button className={styles.btn}>Кольца</button>
      </div>
      <div className={[styles.imageWrapper, styles.image5].join(' ')}>
        <button className={[styles.image, styles.btn5].join(' ')}></button>
        <button className={styles.btn}>Sale</button>
      </div>
    </div>
  );
};
