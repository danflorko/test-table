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
import { EProductsKeys, ESortTypes } from 'src/controller/enums';

import type { FC } from 'react';
import type {
  IMarginProductsValues,
  IProduct,
  IProductFilters,
  TProductOnlyString,
} from 'src/controller/types';

import './styles.scss';

interface ProductTableProps {
  products: IProduct[];
};

const ProductsTable: FC<ProductTableProps> = ({
  products,
}) => {
  const [sortType, setSortType] = useState<ESortTypes>(ESortTypes.DISABLE);
  const [sortColumn, setSortColumn] = useState<keyof IProduct | null>(null);
  const [sortedProducts, setSortedProducts] = useState<IProduct[]>(products);
  const [filters, setFilters] = useState<Partial<IProductFilters> | null>(null);
  const [marginProductsValues, setMarginProductsValues] =
    useState<IMarginProductsValues>({} as IMarginProductsValues);

  useEffect(() => {
    setSortedProducts(products);
  }, [products]);

  const handleMinMaxFiltersChange = useCallback(
    (key: string, min: number = 0, max: number = 99999) => {
      setFilters(prev => ({
        ...prev,
        [key]: {
          min,
          max,
        },
      }));
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

      setFilters(prev => ({
        ...prev,
        [correctTitle]: value,
      }))
    },
    [sortedProducts]
  );

  useEffect(() => {
    setSortedProducts(
      products.filter((product) => {
        if (filters) {
          for (const key in filters) {
            if (filters.hasOwnProperty(key)) {
              if ((key === 'rating' || key === 'price' || key === 'stock')) {
                const value = product[key as keyof IProduct] as number;
                const min = filters[key]?.min;
                const max = filters[key]?.max;
                if (min !== undefined && max !== undefined && (value < min || value > max)) {
                  return false;
                }
              } else {
                if (!((product[key as keyof IProductFilters] as string).includes(filters[key as keyof IProductFilters] as string))) {
                  return false;
                }
              }
            }

          }
        }

        return true;
      }
      )
    );
  }, [filters, products])

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
        {sortedProducts &&
          sortedProducts.map((product) => (
            <ProductRow key={`product-${product.id}`} product={product} />
          ))}
      </tbody>
    </table>
  );
};

export default ProductsTable;
