import { EProductsKeys } from '../enums';

export type PropType<T extends object> = T[keyof T];

export type TransposedValues<T extends object, C = PropType<T>> = {
	[key in keyof T]?: C[];
};

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

export interface IProductFilters {
  title: string;
	description: string;
	price: {
    min: number,
    max: number
  };
  rating: {
    min: number,
    max: number
  };
	stock: {
    min: number,
    max: number
  };
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
