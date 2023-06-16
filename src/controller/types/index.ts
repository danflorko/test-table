import { number } from 'yup';
import { EProductsKeys } from '../enums';

export interface IProduct {
	id: number;
	title: string;
	description: string;
	price: number;
	thumbnail: string;
	rating: number;
	stock: number;
	category: string;
	brand: string;
	images: string[];
}

export type TProductOnlyString = Omit<
	IProduct,
	'id' | 'price' | 'rating' | 'stock' | 'images'
>;

export interface IMarginProductsValues {
	minPrice: number;
	maxPrice: number;
	minStock: number;
	maxStock: number;
	minRating: number;
	maxRating: number;
}

export type INumericSteps = {
	[key in EProductsKeys]?: number;
};

export type ICastedKeys = {
	[key in EProductsKeys]?: keyof IProduct;
};
