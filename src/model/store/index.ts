import { configureStore } from '@reduxjs/toolkit';
import productsSlice from '../reducers/products';

const store = configureStore({
	reducer: {
    products: productsSlice,
	}
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
