import { useSelector } from 'react-redux';

import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items);
  console.log(cartItems);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.length === 0 && <p>Your cart is empty.</p>}
        {cartItems.map((item) => {
          return (<CartItem key={item.id}
            item={{ id: item.id, title: item.title, quantity: item.quantity, total: item.totalPrice, price: item.price }}
          />)
        })
        }
      </ul>
    </Card>
  );
};

export default Cart;
