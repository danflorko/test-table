import { IProduct } from 'src/controller/types';

export const sortByProperty = <T extends keyof IProduct>(
	products: IProduct[],
	property: T,
	direction: 'asc' | 'desc' = 'asc'
): IProduct[] => {
	const normalizedProperty = property.toLocaleLowerCase() as keyof IProduct;

	return products.sort((a, b) => {
		const compareResult =
			typeof a[normalizedProperty] === 'string'
				? (a[normalizedProperty] as string).localeCompare(
						b[normalizedProperty] as string
				  )
				: (a[normalizedProperty] as number) - (b[normalizedProperty] as number);

		return direction === 'asc' ? compareResult : -compareResult;
	});
};
