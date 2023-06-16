import { useEffect, useState, lazy, Suspense, memo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { FC } from 'react';

import Spinner from 'src/view/ui/Spinner';
import { getProduct } from 'src/controller/api';
import { IProduct } from 'src/controller/types';

import './styles.scss';

const ProductCard = lazy(() => import('../ProductCard'));

const Product: FC = () => {
	const [product, setProduct] = useState<IProduct | null>(null);
	const location = useLocation();
	const navigate = useNavigate();

	const handleClick = useCallback(() => navigate('/products'), [navigate]);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const product = await getProduct(location.pathname);
				setProduct(product);
			} catch (error) {
				console.error(error);
			}
		};

		fetchProduct();
	}, [location]);

	return (
		<div className='product'>
			<div>
				<button className='product__button btn' onClick={handleClick}>
					Back
				</button>
			</div>
			{!!product && (
				<Suspense fallback={<Spinner />}>
					<div className='product__container'>
						<ProductCard product={product} />
					</div>
				</Suspense>
			)}
		</div>
	);
};

export default memo(Product);
