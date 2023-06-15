import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from 'src/controller/utils/axios';
import { INewProduct, IProduct } from 'src/controller/types';

const initialState = {
	products: [] as IProduct[],
};

export const fetchData = createAsyncThunk('products/fetchData', async () => {
	try {
		const response = await instance.get('/products');

		return response.data.products;
	} catch (e) {
		console.log(e);
	}
});

export const addProduct = createAsyncThunk(
	'products/addProduct',
	async (data: INewProduct) => {
		try {
			const response = await instance.post('/products/add', {
				...data,
			});

			return response.data;
		} catch (e) {
			console.log(e);
		}
	}
);

export const deleteProduct = createAsyncThunk(
	'products/deleteProduct',
	async ({ id }: { id: number }) => {
		try {
			const response = await instance.delete(`/products/${id}`);
			return response.data;
		} catch (e) {
			console.log(e);
		}
	}
);

export const editProduct = createAsyncThunk(
	'products/editProduct',
	async ({ id, values }: { id: number; values: Partial<IProduct> }) => {
		try {
			const response = await instance.patch(`/products/${id}`, {
				...values,
			});

			return response.data;
		} catch (e) {
			console.log(e);
		}
	}
);

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchData.fulfilled, (state, action) => {
				state.products = action.payload;
			})
			.addCase(addProduct.fulfilled, (state, action) => {
				state.products.push(action.payload);
			})
			.addCase(deleteProduct.fulfilled, (state, action) => {
				state.products = state.products.filter(
					(product) => product.id !== action.payload.id
				);
			})
			.addCase(editProduct.fulfilled, (state, action) => {
				const editedProduct = action.payload;
				const index = state.products.findIndex(
					(product) => product.id === editedProduct.id
				);
				if (index !== -1) {
					state.products[index] = {
						...state.products[index],
						...editedProduct,
					};
				}
			});
	},
});

export default productsSlice.reducer;
