import { memo, useEffect, useCallback, useState, lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import type { ChangeEvent, FC } from 'react';

import ProductsTable from 'src/view/components/ProductsTable';
import InputText from 'src/view/ui/InputText';
import Spinner from 'src/view/ui/Spinner';
import { useAppDispatch, useAppSelector } from 'src/controller/utils/hooks';
import { fetchData } from 'src/model/reducers/products';

import './styles.scss';

const AddModal = lazy(() => import('src/view/components/AddModal'));

const ProductsPage: FC = () => {
	const dispatch = useAppDispatch();
	const { products } = useAppSelector((store) => store.products);

	const [isOpen, setIsOpen] = useState(false);
	const [query, setQuery] = useState('');
	const [filteredProducts, setFilteredProducts] = useState([...products]);

	const handleClose = useCallback(() => {
		setIsOpen(false);
		localStorage.removeItem('ProductAdd');
	}, []);

	const handleToggleOpen = useCallback(() => setIsOpen((prev) => !prev), []);

	const handleSearchOnChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setQuery(e.target.value);
		},
		[]
	);

	useEffect(() => {
		dispatch(fetchData());
	}, [dispatch]);

	useEffect(() => {
		setFilteredProducts(
			products.filter(
				(product) =>
					product.title
						.toLocaleLowerCase()
						.includes(query.toLocaleLowerCase()) ||
					product.category
						.toLocaleLowerCase()
						.includes(query.toLocaleLowerCase())
			)
		);
	}, [products, query]);

	useEffect(() => {
		const checkLocalStorage = () => {
			const productFromLocalStorage = localStorage.getItem('ProductAdd');
			if (productFromLocalStorage) {
				setIsOpen(true);
			}
		};

		checkLocalStorage();
	}, []);

	return (
		<>
			<div className='products'>
				<div className='products__search'>
					<InputText label={'Search'} onChange={handleSearchOnChange} />
				</div>
				<div className='products__table'>
					<ProductsTable products={filteredProducts} />
				</div>
				<div className='products__container-add'>
					<button
						type='button'
						className='products__add btn btn--light'
						onClick={handleToggleOpen}
					>
						<img
							src='images/buttons/add.svg'
							title='Add new product button'
							alt='Add new product button'
						/>
					</button>
				</div>
				<Suspense fallback={<Spinner />}>
					<AddModal isOpen={isOpen} handleClose={handleClose} />
				</Suspense>
			</div>
			<Outlet />
		</>
	);
};

export default memo(ProductsPage);
