import React, { useEffect } from 'react';
import { FC, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { EFilterType, ESortType } from 'src/controller/enums';
import { IProduct, TProductOnlyString } from 'src/controller/types';
import { useAppDispatch } from 'src/controller/utils/hooks';
import { deleteProduct } from 'src/model/reducers/products';
import TableHeader from 'src/view/elements/TableHeader';
import EditModal from '../EditModal';
import './styles.scss';

const productsKeys = [
  'ID',
  'Name',
  'Description',
  'Price',
  'Photo',
  'Rating',
  'Stock',
  'Category',
  'Actions',
]

interface ProductTableProps {
  products: IProduct[];
}

const ProductsTable: FC<ProductTableProps> = ({ products }) => {
  const initialProducts = [...products];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [sortType, setSortType] = useState<ESortType>(ESortType.DISABLE);

  const [sortedProducts, setSortedProducts] = useState<IProduct[]>(initialProducts);
  const [filteredProducts, setFilteteredProducts] = useState<IProduct[] | null>(null);

  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);

  const handleDelete = (id: number) => {
    dispatch(
      deleteProduct({ id })
    );
  };

  const handleOnEdit = (product: IProduct) => {
    setEditingProduct(product);
  }

  const handleClose = () => {
    setEditingProduct(null);
  }

  const handleMinMaxFiltersChange = (value: string, min: string = '0', max: string = '9999999') => {

    setFilteteredProducts(sortedProducts.filter(product => product[value as keyof IProduct] >= +min && product[value as keyof IProduct] <= +max ));
  }

  useEffect(() => {
    setSortedProducts(initialProducts);
    setFilteteredProducts(initialProducts);
  }, [products]);

  const handleSortTypeChange = (value: keyof IProduct | string, sortBy: string) => {
    const sort = value === 'Name' ? 'title' : value
    setSortType(prev => {
      switch (sortBy) {
        case ESortType.AZ:
          setSortedProducts(prev => {
            if ( typeof prev[0][sort.toLocaleLowerCase() as keyof IProduct] === 'string' ) {
              return prev.sort((a, b) => a[sort.toLocaleLowerCase() as keyof TProductOnlyString].localeCompare(b[sort.toLocaleLowerCase() as keyof TProductOnlyString]))
            }
            else {
              return prev.sort((x, y) => x[sort.toLocaleLowerCase() as keyof IProduct] as number - y[sort.toLocaleLowerCase() as keyof Pick<IProduct, 'price' | 'rating' | 'stock'>])
            }
          })
          return ESortType.AZ

        case ESortType.ZA:
          setSortedProducts(prev => {
            if ( typeof prev[0][sort.toLocaleLowerCase() as keyof IProduct] === 'string') {
              return prev.sort((a, b) => b[sort.toLocaleLowerCase() as keyof TProductOnlyString].localeCompare(a[sort.toLocaleLowerCase() as keyof TProductOnlyString]))
            } else {
              return prev.sort((x, y) => y[sort.toLocaleLowerCase() as keyof Pick<IProduct, 'price' | 'rating' | 'stock'>] - x[sort.toLocaleLowerCase() as keyof Pick<IProduct, 'price' | 'rating' | 'stock'>])
            }
          })
          return ESortType.ZA

        case ESortType.DISABLE:
          setSortedProducts(initialProducts);
          return ESortType.DISABLE;
        default:
          setSortedProducts(initialProducts);
          return ESortType.DISABLE;
      }
    });
  }

  const handleFiltersChange = (value: string, fieldName: keyof TProductOnlyString | 'name') => {
    const correctTitle = fieldName === 'name' ? 'title' : fieldName;

    setFilteteredProducts(sortedProducts.filter(product => product[correctTitle].toLocaleLowerCase().includes(value.toLocaleLowerCase())))
  }

  return (
    <table className='products-table'>
      <thead className='products-table__head'>
        <tr className='products-table__row'>
          {productsKeys.map((productKey: string, index) => (
            <th
              key={index}
              className={`products-table__header
                    ${productKey === 'Description'
                  ? 'products-table__header--medium'
                  : productKey === 'Name'
                    ? 'products-table__header--small' : ''
                }`
              }
            >
              <TableHeader
                currentSortType={sortType}
                productKey={productKey}
                onSortTypeChange={handleSortTypeChange}
                onFiltersChange={handleFiltersChange}
                onMinMaxChage={handleMinMaxFiltersChange}
              />
            </th>

          ))}
        </tr>
      </thead>
      <tbody className='products-table__body'>
        {filteredProducts && filteredProducts.map(product => (
          <tr key={product.id} className='products-table__row'>
            <td
              className='products-table__data products-table__data--bold'
              onClick={() => navigate(`/products/${product.id}`)}
            >
              {product.id}
            </td>
            <td
              className='products-table__data products-table__data--bold'
              onClick={() => navigate(`/products/${product.id}`)}
            >
              {product.title}
            </td>
            <td className='products-table__data'>{product.description}</td>
            <td className='products-table__data'>{product.price}</td>
            <td className='products-table__data'>
              <img
                className='products-table__img'
                src={product.thumbnail}
                title='Hold on to see full size'
              />
            </td>
            <td className='products-table__data'>{product.rating}</td>
            <td className='products-table__data'>{product.stock}</td>
            <td className='products-table__data'>{product.category}</td>

            <td className='products-table__actions'>
              <img
                className='products-table__actions--space btn'
                src='images/buttons/edit.svg'
                alt='Edit Button'
                title='Edit'
                onClick={() => handleOnEdit(product)}
              />
              <img
                className='products-table__actions--space btn'
                src='images/buttons/delete.svg'
                alt='Delete Button'
                title='Delete'
                onClick={() => handleDelete(product.id)}
              />
            </td>
            <div
              className={
                editingProduct ? 'products__add-modal active' : 'products__add-modal'
              }
            >
              {editingProduct && (
                <EditModal
                  handleClose={handleClose}
                  product={editingProduct}
                />
              )}

            </div>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductsTable;