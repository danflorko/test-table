import { EProductsKeys } from 'src/model/enums';
import type {
	INumericSteps,
	ICastedKeys,
	ICastedValues,
} from 'src/controller/types';

export const numericsSteps: INumericSteps = {
	Price: 1,
	Rating: 0.1,
	Stock: 1,
};

export const castedKeys: ICastedKeys = {
	[EProductsKeys.ID]: 'id',
	[EProductsKeys.NAME]: 'title',
	[EProductsKeys.DESCRIPTION]: 'description',
	[EProductsKeys.PRICE]: 'price',
	[EProductsKeys.PHOTO]: 'thumbnail',
	[EProductsKeys.RATING]: 'rating',
	[EProductsKeys.STOCK]: 'stock',
	[EProductsKeys.CATEGORY]: 'category',
};

export const castedValues: ICastedValues = {
	id: EProductsKeys.ID,
	title: EProductsKeys.NAME,
	description: EProductsKeys.DESCRIPTION,
	price: EProductsKeys.PRICE,
	thumbnail: EProductsKeys.PHOTO,
	rating: EProductsKeys.RATING,
	stock: EProductsKeys.STOCK,
	category: EProductsKeys.CATEGORY,
};
