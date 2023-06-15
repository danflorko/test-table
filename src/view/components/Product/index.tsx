import { useEffect, useState, lazy, Suspense } from 'react';
import type { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getProduct } from 'src/controller/api';
import { IProduct } from 'src/controller/types';
import Spinner from 'src/view/ui/Spinner';

import './styles.scss';

const ProductCard = lazy(() => import('../ProductCard'));

const Product: FC = () => {
	const [product, setProduct] = useState<IProduct | null>(null);
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const product = await getProduct(location.pathname);
				setProduct(product);
			} catch (error) {
				console.log(error);
			}
		};

		fetchProduct();
	}, [location]);

	return (
		<div className="product">
			<div>
				<button
					className="product__button btn"
					onClick={() => navigate('/products')}
				>
					Back
				</button>
			</div>
			{!!product && (
				<Suspense fallback={<Spinner />}>
					<div className="product__container">
						<ProductCard product={product} />
					</div>
				</Suspense>
			)}
		</div>
	);
};

export default Product;
