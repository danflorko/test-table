import { EProductsKeys } from '../../model/enums';

export type PropType<T extends object> = T[keyof T];

export type TransposedValues<T extends object, C = PropType<T>> = {
	[key in keyof T]?: C[];
};

export type NumericKeys<T> = {
	[K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

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

export interface INumberRange {
	min: number;
	max: number;
}

export interface IProductFilters {
	title: string;
	description: string;
	price: INumberRange;
	rating: INumberRange;
	stock: INumberRange;
	category: string;
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

export type ICastedValues = {
	[key in keyof Partial<IProduct>]: EProductsKeys;
};
