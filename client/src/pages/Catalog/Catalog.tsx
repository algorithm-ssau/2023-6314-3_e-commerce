import styles from './Catalog.module.css';
import { ProductsFilter } from '../../components/ProductsFilter';
import { ProductsGrid } from '../../components/ProductsGrid';

export const Catalog = () => {
  return (
    <div className={styles.container}>
      <ProductsFilter />
      <ProductsGrid />
    </div>
  );
};
