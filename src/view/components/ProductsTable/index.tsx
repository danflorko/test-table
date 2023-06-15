import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import type { FC } from 'react';

import TableHeader from 'src/view/ui/TableHeader';
import { ESortTypes } from 'src/controller/enums';
import { sortByProperty } from 'src/controller/utils/helpers';
import type {
	IMinMaxValuesOfProducts,
	IProduct,
	TProductOnlyString,
} from 'src/controller/types';

import './styles.scss';
import ProductRow from '../ProductRow';

const productsKeys = [
	'ID',
	'Photo',
	'Name',
	'Description',
	'Price',
	'Rating',
	'Stock',
	'Category',
	'Actions',
];

interface ProductTableProps {
	products: IProduct[];
}

const ProductsTable: FC<ProductTableProps> = ({ products }) => {
	const [sortType, setSortType] = useState<ESortTypes>(ESortTypes.DISABLE);
	const [sortColumn, setSortColumn] = useState<keyof IProduct | null>(null);
	const [sortedProducts, setSortedProducts] = useState<IProduct[]>(products);
	const [filteredProducts, setFilteteredProducts] = useState<IProduct[] | null>(
		null
	);
	const [minMaxValuesOfProducts, setMinMaxValuesOfProducts] =
		useState<IMinMaxValuesOfProducts | null>(null);

	const handleMinMaxFiltersChange = useCallback(
		(value: string, min: string = '0', max: string = '9999999') => {
			setFilteteredProducts(
				sortedProducts.filter(
					(product) =>
						product[value as keyof IProduct] >= +min &&
						product[value as keyof IProduct] <= +max
				)
			);
		},
		[sortedProducts]
	);

	useEffect(() => {
		setSortedProducts(products);
		setFilteteredProducts(products);
	}, [products]);

	const handlESortTypesChange = useCallback(
		(value: keyof IProduct | string, sortBy: string) => {
			const sort = (value === 'Name' ? 'title' : value) as keyof IProduct;

			setSortType(() => {
				switch (sortBy) {
					case ESortTypes.AZ:
						setSortColumn(sort);
						setSortedProducts((prev) => sortByProperty(prev, sort, 'asc'));
						return ESortTypes.AZ;

					case ESortTypes.ZA:
						setSortColumn(sort);
						setSortedProducts((prev) => sortByProperty(prev, sort, 'desc'));
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
			const correctTitle = fieldName === 'name' ? 'title' : fieldName;

			setFilteteredProducts(
				sortedProducts.filter((product) =>
					product[correctTitle]
						.toLocaleLowerCase()
						.includes(value.toLocaleLowerCase())
				)
			);
		},
		[sortedProducts]
	);

	useEffect(() => {
		const getMinMaxValues = async () => {
			const filteredProducts = products.filter(
				(product) => product !== undefined
			);

			setMinMaxValuesOfProducts({
				minPrice: Math.min(...filteredProducts.map((product) => product.price)),
				maxPrice: Math.max(...filteredProducts.map((product) => product.price)),
				minStock: Math.min(...filteredProducts.map((product) => product.stock)),
				maxStock: Math.max(...filteredProducts.map((product) => product.stock)),
				minRating: Math.min(
					...filteredProducts.map((product) => product.rating)
				),
				maxRating: Math.max(
					...filteredProducts.map((product) => product.rating)
				),
			});
		};

		getMinMaxValues();
	}, []);

	console.log(minMaxValuesOfProducts);

	return (
		<table className="products-table">
			<thead className="products-table__head">
				<tr className="products-table__row">
					{minMaxValuesOfProducts &&
						productsKeys.map((productKey: string, index) => (
							<th
								key={`head-${index}`}
								className={classNames('products-table__header', {
									'products-table__header--medium':
										productKey === 'Description',
									'products-table__header--small': productKey === 'Name',
								})}
							>
								<TableHeader
									productKey={productKey}
									isSorted={
										sortColumn ===
										(productKey === 'Name' ? 'title' : productKey)
									}
									minMaxValuesOfProducts={minMaxValuesOfProducts}
									currentSortType={sortType}
									onSortTypeChange={handlESortTypesChange}
									onFiltersChange={handleFiltersChange}
									onMinMaxChage={handleMinMaxFiltersChange}
								/>
							</th>
						))}
				</tr>
			</thead>
			<tbody className="products-table__body">
				{filteredProducts &&
					filteredProducts.map((product) => (
						<ProductRow key={`product-${product.id}`} product={product} />
					))}
			</tbody>
		</table>
	);
};

export default ProductsTable;
