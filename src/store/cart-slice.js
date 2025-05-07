import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: { items: [], totalQuantity: 0 },
    reducers: {
        addProduct(state, action) {
            const { id, title, price, description } = action.payload;
            const existingItem = state.items.find(item => item.id === id);

            if (existingItem) {
                existingItem.totalPrice = existingItem.totalPrice + existingItem.price;
                existingItem.quantity++;
            } else {
                state.items.push({ id, title, price, quantity: 1, totalPrice: price, description });
            }

            state.totalQuantity++;
        },
        increaseQuantity(state, action) {
            const existingItem = state.items.find(item => item.id === action.payload);
            if (existingItem) {
                existingItem.totalPrice = existingItem.totalPrice + existingItem.price;
                existingItem.quantity++;
            }

            state.totalQuantity++;
        },
        decreaseQuantity(state, action) {
            const existingItem = state.items.find(item => item.id === action.payload);

            if (!existingItem) return;

            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item !== existingItem);
            } else {
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
                existingItem.quantity--;
            }

            state.totalQuantity--;
        }
    }
});

export const cartActions = cartSlice.actions;

export default cartSlice;