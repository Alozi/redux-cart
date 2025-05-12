import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

export function fetchCartData() {
    return async (dispatch) => {
        async function fetchData() {
            const response = await fetch('https://redux-cart-e1ef2-default-rtdb.firebaseio.com/cart.json');

            if (!response.ok) {
                throw new Error('Fetching cart data failed.');
            }

            const data = await response.json();

            return data;
        }

        try {
            const cart = await fetchData();
            dispatch(cartActions.replaceCart({
                items: cart.items || [],
                totalQuantity: cart.totalQuantity
            }));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Fetching cart data failed!'
            }));
        }
    }
}

export function sendCartData(cart) {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!'
        }));

        async function sendRequest() {
            const response = await fetch('https://redux-cart-e1ef2-default-rtdb.firebaseio.com/cart.json', {
                method: 'PUT',
                body: JSON.stringify({ items: cart.items, totalQuantity: cart.totalQuantity }),
            });

            if (!response.ok) {
                throw new Error('Sending cart data failed.');
            }
        }

        try {
            await sendRequest();

            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Seccess!',
                message: 'Send cart data successfully!'
            }));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Sending cart data failed!'
            }));
        }
    }
}
