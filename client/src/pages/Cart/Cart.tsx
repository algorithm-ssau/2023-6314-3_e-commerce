import { CartProduct } from '../../components/CartProduct'
import styles from './Cart.module.css'

export const Cart = () => {
  return (
    <div className={'container ' + styles.container}>
      <CartProduct />
      <CartProduct />
      <CartProduct />
    </div>
  )
}
