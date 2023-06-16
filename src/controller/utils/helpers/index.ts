import { IProduct } from 'src/controller/types';
import * as Yup from 'yup';

export const castProperty = <T>(
	value: string,
	caster: string,
	casted: string
) => {
	return (caster === casted ? value : casted) as T;
};

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

export const validationSchema = Yup.object().shape({
	title: Yup.string().required('Name is required'),
	description: Yup.string(),
	price: Yup.number()
		.positive('Price should be positive number')
		.typeError('Must be a number')
		.required('Price is required'),
	thumbnail: Yup.string().matches(
		/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
		'Enter valid URL for photo!'
	),
	rating: Yup.number()
		.positive()
		.min(0, 'Min rating 0')
		.max(5, 'Max rating 5')
		.typeError('Must be a number')
		.required('Rating is required'),
	stock: Yup.number()
		.positive('Must be a positive number')
		.integer('Must be an integer number')
		.required('Stock is required'),
	category: Yup.string().required('Category is required'),
});
