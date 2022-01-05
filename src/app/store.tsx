import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../feature/cartSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
