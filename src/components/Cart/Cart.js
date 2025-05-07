import { useSelector } from 'react-redux';

import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
  const cart = useSelector(state => state.cart.cart);
  console.log(cart);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cart.length === 0 && <p>Your cart is empty.</p>}
        {cart.map((item) => {
          return (<CartItem key={item.title}
            item={{ title: item.title, quantity: item.quantity, total: item.quantity * item.price, price: item.price }}
          />)
        })
        }
      </ul>
    </Card>
  );
};

export default Cart;
