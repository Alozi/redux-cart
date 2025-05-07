import { useSelector, useDispatch } from 'react-redux';

import { showCartActions } from '../../store/index';
import classes from './CartButton.module.css';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const totalQuantity = useSelector(state => state.cart.totalQuantity);

  function cartHandler() {
    dispatch(showCartActions.toogle());
  }

  return (
    <button className={classes.button} onClick={cartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
