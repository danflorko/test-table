import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';

import ProductRow from '../ProductRow';
import TableHeaderCell from 'src/view/ui/TableHeaderCell';
import { castedKeys } from 'src/model/constants';
import {
	castProperty,
	parseProps,
	sortByProperty,
} from 'src/controller/utils/helpers';
import { EProductsKeys, ESortTypes } from 'src/model/enums';

import type { FC } from 'react';
import type {
	IMarginProductsValues,
	INumberRange,
	IProduct,
	IProductFilters,
	NumericKeys,
	TProductOnlyString,
} from 'src/controller/types';

import './styles.scss';

interface ProductTableProps {
	products: IProduct[];
}

const ProductsTable: FC<ProductTableProps> = ({ products }) => {
	const [sortType, setSortType] = useState<ESortTypes>(ESortTypes.DISABLE);
	const [sortColumn, setSortColumn] = useState<keyof IProduct | null>(null);
	const [processedProducts, setProcessedProducts] =
		useState<IProduct[]>(products);
	const [filters, setFilters] = useState<Partial<IProductFilters> | null>(null);
	const [marginProductsValues, setMarginProductsValues] =
		useState<IMarginProductsValues>({} as IMarginProductsValues);

	useEffect(() => {
		setProcessedProducts(products);
	}, [products]);

	const handleMinMaxFiltersChange = useCallback(
		(key: string, min: number = 0, max: number = 99999) => {
			setFilters((prev) => ({
				...prev,
				[key]: {
					min,
					max,
				},
			}));
		},
		[]
	);

	useEffect(() => {
		const {
			price = [],
			stock = [],
			rating = [],
		} = parseProps<IProduct>(products, ['price', 'stock', 'rating']);

		setMarginProductsValues({
			minPrice: Math.min(...(price as number[])),
			maxPrice: Math.max(...(price as number[])),
			minStock: Math.min(...(stock as number[])),
			maxStock: Math.max(...(stock as number[])),
			minRating: Math.min(...(rating as number[])),
			maxRating: Math.max(...(rating as number[])),
		});
	}, [products]);

	useEffect(() => {
		setProcessedProducts(products);
	}, [products]);

	const handlESortTypesChange = useCallback(
		(value: keyof IProduct | string, sortBy: string) => {
			const key = castProperty<keyof IProduct>('title', 'Name', value);

			setSortType(() => {
				switch (sortBy) {
					case ESortTypes.ASC:
						setSortColumn(key);
						setProcessedProducts((prev) => sortByProperty(prev, key, 'asc'));
						return ESortTypes.ASC;

					case ESortTypes.DESC:
						setSortColumn(key);
						setProcessedProducts((prev) => sortByProperty(prev, key, 'desc'));
						return ESortTypes.DESC;

					case ESortTypes.DISABLE:
					default:
						setSortColumn(null);
						setProcessedProducts((prev) => prev.sort((x, y) => x.id - y.id));
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

			setFilters((prev) => ({
				...prev,
				[correctTitle]: value,
			}));
		},
		[]
	);

	useEffect(() => {
		setProcessedProducts(
			products.filter((product) =>
				Object.entries(filters ?? {}).every(([key, filterValue]) => {
					const productValue = product[key as NumericKeys<IProduct>];

					if (
						Object.values(filterValue).every((val) => typeof val === 'number')
					) {
						const value = filterValue as INumberRange;
						return productValue >= value.min && productValue <= value.max;
					}

					return String(productValue).includes(String(filterValue));
				})
			)
		);
	}, [filters, products]);

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
										setFilters={setFilters}
									/>
								</th>
							)
						)}
				</tr>
			</thead>
			<tbody className="products-table__body">
				{processedProducts &&
					processedProducts.map((product) => (
						<ProductRow key={`product-${product.id}`} product={product} />
					))}
			</tbody>
		</table>
	);
};

export default ProductsTable;
