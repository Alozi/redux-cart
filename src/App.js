import { useEffect } from 'react';

import { useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

function App() {
  const cartIsVisible = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);

  useEffect(() => {
    console.log('useEffect');
    async function sendCartData() {
      const response = await fetch('https://redux-cart-e1ef2-default-rtdb.firebaseio.com/cart.json', {
        method: 'PUT',
        body: JSON.stringify(cart),
      });

      console.log('response');
      console.log(response);

      if (!response.ok) {
        console.log('error');
        throw new Error('Sending cart data failed.');
      }

      const responseData = await response.json();
      console.log('responseData');
      console.log(responseData);
    }

    sendCartData();
  }, [cart]);

  return (
    <Layout>
      {cartIsVisible && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
