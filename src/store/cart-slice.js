import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: { items: [], totalQuantity: 0 },
    reducers: {
        addProduct(state, action) {
            const { title, price } = action.payload;
            const existingItem = state.items.find(item => item.title === title);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.items.push({ title, price, quantity: 1 });
            }

            state.totalQuantity++;
        },
        increaseQuantity(state, action) {
            const existingItem = state.items.find(item => item.title === action.payload);
            if (existingItem) {
                existingItem.quantity++;
            }

            state.totalQuantity++;
        },
        decreaseQuantity(state, action) {
            const existingItem = state.items.find(item => item.title === action.payload);

            if (!existingItem) return;

            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item !== existingItem);
            } else {
                existingItem.quantity--;
            }

            state.totalQuantity--;
        }
    }
});

export const cartActions = cartSlice.actions;

export default cartSlice;