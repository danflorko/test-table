import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import type { FC } from 'react';

import ProductRow from '../ProductRow';
import TableHeaderCell, { castedKeys } from 'src/view/ui/TableHeaderCell';
import { castProperty, sortByProperty } from 'src/controller/utils/helpers';
import { EProductsKeys, ESortTypes } from 'src/controller/enums';
import type {
	IMarginProductsValues,
	IProduct,
	TProductOnlyString,
} from 'src/controller/types';

import './styles.scss';

interface ProductTableProps {
	products: IProduct[];
}

const ProductsTable: FC<ProductTableProps> = ({ products }) => {
	const [sortType, setSortType] = useState<ESortTypes>(ESortTypes.DISABLE);
	const [sortColumn, setSortColumn] = useState<keyof IProduct | null>(null);
	const [sortedProducts, setSortedProducts] = useState<IProduct[]>(products);
	const [marginProductsValues, setMarginProductsValues] =
		useState<IMarginProductsValues>({} as IMarginProductsValues);

	const handleMinMaxFiltersChange = useCallback(
		(key: string, min: number = 0, max: number = 99999) => {
			setSortedProducts(
				products.filter((product) => {
					const value = product[key as keyof IProduct] as number;
					return value >= min && value <= max;
				})
			);
		},
		[products]
	);

	useEffect(() => {
		const { prices, stocks, ratings } = products.reduce(
			(acc, product) => ({
				prices: [...acc.prices, product.price],
				stocks: [...acc.stocks, product.stock],
				ratings: [...acc.ratings, product.rating],
			}),
			{
				prices: [] as number[],
				stocks: [] as number[],
				ratings: [] as number[],
			}
		);

		setMarginProductsValues({
			minPrice: Math.min(...prices),
			maxPrice: Math.max(...prices),
			minStock: Math.min(...stocks),
			maxStock: Math.max(...stocks),
			minRating: Math.min(...ratings),
			maxRating: Math.max(...ratings),
		});
	}, [products]);

	useEffect(() => {
		setSortedProducts(products);
	}, [products]);

	const handlESortTypesChange = useCallback(
		(value: keyof IProduct | string, sortBy: string) => {
			const key = castProperty<keyof IProduct>('title', 'Name', value);

			setSortType(() => {
				switch (sortBy) {
					case ESortTypes.AZ:
						setSortColumn(key);
						setSortedProducts((prev) => sortByProperty(prev, key, 'asc'));
						return ESortTypes.AZ;

					case ESortTypes.ZA:
						setSortColumn(key);
						setSortedProducts((prev) => sortByProperty(prev, key, 'desc'));
						return ESortTypes.ZA;

					case ESortTypes.DISABLE:
					default:
						setSortColumn(null);
						setSortedProducts((prev) => prev.sort((x, y) => x.id - y.id));
						return ESortTypes.DISABLE;
				}
			});
		},
		[]
	);

	const handleFiltersChange = useCallback(
		(value: string, fieldName: keyof TProductOnlyString | 'name') => {
			const correctTitle = castProperty<keyof TProductOnlyString>(
				'title',
				'name',
				fieldName
			);

			setSortedProducts(
				sortedProducts.filter((product) =>
					product[correctTitle]
						.toLocaleLowerCase()
						.includes(value.toLocaleLowerCase())
				)
			);
		},
		[sortedProducts]
	);

	console.log(marginProductsValues);

	return (
		<table className="products-table">
			<thead className="products-table__head">
				<tr className="products-table__row">
					{marginProductsValues &&
						Object.values(EProductsKeys).map(
							(productKey: EProductsKeys, index) => (
								<th
									key={`head-${index}`}
									className={classNames('products-table__header', {
										'products-table__header--medium':
											productKey === 'Description',
										'products-table__header--small': productKey === 'Name',
									})}
								>
									<TableHeaderCell
										totalMin={
											marginProductsValues[
												`min${productKey}` as keyof IMarginProductsValues
											]
										}
										totalMax={
											marginProductsValues[
												`max${productKey}` as keyof IMarginProductsValues
											]
										}
										productKey={productKey}
										isSorted={sortColumn === castedKeys[productKey]}
										currentSortType={sortType}
										onSortTypeChange={handlESortTypesChange}
										onFiltersChange={handleFiltersChange}
										onMinMaxChage={handleMinMaxFiltersChange}
									/>
								</th>
							)
						)}
				</tr>
			</thead>
			<tbody className="products-table__body">
				{sortedProducts &&
					sortedProducts.map((product) => (
						<ProductRow key={`product-${product.id}`} product={product} />
					))}
			</tbody>
		</table>
	);
};

export default ProductsTable;
