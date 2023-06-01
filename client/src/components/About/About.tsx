import styles from './About.module.css';

export const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.picture}>
        <img src="./images/home__about.jpg" alt="О нас" />
      </div>
      <div className={styles.aboutInfo}>
        <h3>О нас</h3>
        <p>
          Мы — молодой бренд, который радует своих клиентов качественными
          украшениями из драгоценных металлов.
        </p>
        <p>
          Наша цель заключается в том, чтобы подчеркнуть естественную красоту
          каждой девушки и подарить чувство стиля и индивидуальности.
        </p>
        <p>
          Чтобы выглядеть шикарно, не нужен повод. Пусть красота и изящество
          будут постоянными спутниками Вашей жизни!
        </p>
      </div>
    </div>
  );
};
