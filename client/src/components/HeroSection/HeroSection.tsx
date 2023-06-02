import styles from './HeroSection.module.css';
import { Image } from 'mui-image';
import { RightArrow } from '../RightArrow';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  return (
    <div className={styles.container}>
      <div className={styles.picturesContainer}>
        <div className={styles.backgroundPicture}>
          <Image
            src="./images/home__hero-back.jpg"
            alt="Девушка в зеркале"
          />
        </div>
        <div className={styles.frontPicture}>
          <Image src="./images/home__hero-front.jpg" alt="Рука с кольцами" />
        </div>
      </div>
      <div className={styles.infoContainer}>
        <h1 className={styles.title}>
          Почувствуй свою
          <span className={styles.titleSecondLine}>уникальность</span>
        </h1>
        <p className={styles.subtitle}>
          Изысканные украшения, которые
          <br />
          выгодно дополнят Ваш образ
          <br />и подчеркнут достоинства
        </p>
        <Link className={styles.toCatalog} to="/products">
          Каталог
          <RightArrow />
        </Link>
      </div>
    </div>
  );
};
