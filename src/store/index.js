import { configureStore, createSlice } from "@reduxjs/toolkit";

import uiSlice from './ui-slice';

const cart = createSlice({
    name: 'cart',
    initialState: { cart: [], totalQuantity: 0 },
    reducers: {
        addProduct(state, action) {
            const { title, price } = action.payload;
            const existingItem = state.cart.find(item => item.title === title);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cart.push({ title, price, quantity: 1 });
            }

            state.totalQuantity += 1;

        },
        increaseQuantity(state, action) {
            const existingItem = state.cart.find(item => item.title === action.payload);
            if (existingItem) {
                existingItem.quantity += 1;
            }

            state.totalQuantity += 1;
        },
        decreaseQuantity(state, action) {
            const existingItem = state.cart.find(item => item.title === action.payload);

            if (!existingItem) return;

            if (existingItem.quantity === 1) {
                state.cart = state.cart.filter(item => item !== existingItem);
            } else {
                existingItem.quantity -= 1;
            }

            state.totalQuantity -= 1;
        }
    }
});

const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        cart: cart.reducer
    }
});


export const cartActions = cart.actions;

export default store;