import { About } from '../../components/About';
import { Gallery } from '../../components/Gallery';
import { HeroSection } from '../../components/HeroSection';
import { ShowCaseProducts } from '../../components/ShowCaseProducts';
import styles from './Home.module.css';

export const Home = () => {
  return (
    <>
      <div className="container">
        <main className={styles.main}>
          <HeroSection />
          <h2 className={styles.subtitle}>
            Изящество - главный секрет нашего бренда
          </h2>
          <Gallery />
          <button className={styles.viewAll}>Смотреть полностью</button>
          <ShowCaseProducts />
          <About />
        </main>
      </div>
    </>
  );
};
