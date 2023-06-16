import { EProductsKeys } from 'src/controller/enums';
import type { INumericSteps, ICastedKeys } from 'src/controller/types';

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
