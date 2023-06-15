import { ChangeEvent, FC, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

import ProductsTable from 'src/view/components/ProductsTable';
import InputText from 'src/view/ui/InputText';
import './styles.scss';
import { useAppDispatch, useAppSelector } from 'src/controller/utils/hooks';
import { fetchData } from 'src/model/reducers/products';
import AddModal from 'src/view/components/AddModal';

const ProductsPage: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { products } = useAppSelector(store => store.products);
  const [query, setQuery] = useState('');

  const filteredProducts = products
  .filter(product =>
    product.title
    .toLocaleLowerCase()
    .includes(query.toLocaleLowerCase())
    ||
    product.category
    .toLocaleLowerCase()
    .includes(query.toLocaleLowerCase()));

  const handleClose = () => {
    setIsOpen(false)
  };

  const handleSearchOnChange = (e: ChangeEvent<any>) => {
    setQuery(e.target.value);
  }

  useEffect(() => {
    dispatch(
      fetchData()
    )
  }, [dispatch]);

  return (
    <>
      <div className='products'>
        <div className='products__search'>
          <InputText
            label={'Search'}
            onChange={handleSearchOnChange}
          />
        </div>
        <div className='products__table'>
          <ProductsTable products={filteredProducts}/>
        </div>
        <div className='products__container-add'>
          <button
            type='button'
            className='products__add btn btn--light'
            onClick={() => setIsOpen(prev => !prev)}
          >
            <img
              src='images/buttons/add.svg'
              title='Add new product button'
              alt='Add new product button'
            />
          </button>
        </div>
        <AddModal isOpen={isOpen} handleClose={handleClose}/>
      </div>
      <Outlet />
    </>

  );
}

export default ProductsPage;
