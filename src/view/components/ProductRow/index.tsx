import { Suspense, lazy, memo, useCallback, useState } from 'react';
import type { FC } from 'react';

import Spinner from 'src/view/ui/Spinner';
import TableCell from 'src/view/ui/TableCell';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'src/controller/utils/hooks';
import { deleteProduct } from 'src/model/reducers/products';
import type { IProduct } from 'src/controller/types';

import './styles.scss';

const EditModal = lazy(() => import('../EditModal'));

interface ProductRowProps {
	product: IProduct;
}

const ProductRow: FC<ProductRowProps> = ({ product }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);

	const handleDelete = useCallback(() => {
		dispatch(deleteProduct({ id: product.id }));
	}, [dispatch, product.id]);

	const handleOnEdit = useCallback(() => {
		setEditingProduct(product);
	}, [product]);

	const handleClose = useCallback(() => {
		setEditingProduct(null);
	}, []);

	const handleProductOpen = useCallback(() => {
		navigate(`/products/${product.id}`);
	}, [navigate, product.id]);

	return (
		<tr key={product.id} className="products-table__row">
			<TableCell
				className={'products-table__row__data products-table__row__data--bold'}
				onClick={handleProductOpen}
			>
				<>{product.id}</>
			</TableCell>
			<TableCell
				className={'products-table__row__data products-table__row__img'}
				onClick={handleProductOpen}
			>
				<img
					className="products-table__row__img"
					src={product.thumbnail}
					title="Hold on to see full size"
					alt={'Product'}
				/>
			</TableCell>
			<TableCell
				className={'products-table__row__data products-table__row__data--bold'}
				onClick={handleProductOpen}
			>
				<>{product.title}</>
			</TableCell>
			<TableCell
				className={'products-table__row__data'}
				onClick={handleProductOpen}
			>
				<>{product.description}</>
			</TableCell>
			<TableCell className={'products-table__row__data'}>
				<>{product.price}</>
			</TableCell>
			<TableCell className={'products-table__row__data'}>
				<>{product.rating}</>
			</TableCell>
			<TableCell className={'products-table__row__data'}>
				<>{product.stock}</>
			</TableCell>
			<TableCell className={'products-table__row__data'}>
				<>{product.category}</>
			</TableCell>
			<TableCell className={'products-table__row__actions'}>
				<img
					className="products-table__row__actions--space btn"
					src="images/buttons/edit.svg"
					alt="Edit Button"
					title="Edit"
					onClick={handleOnEdit}
				/>
				<img
					className="products-table__row__actions--space btn"
					src="images/buttons/delete.svg"
					alt="Delete Button"
					title="Delete"
					onClick={handleDelete}
				/>
			</TableCell>
			<div
				className={
					editingProduct ? 'products__add-modal active' : 'products__add-modal'
				}
			>
				{editingProduct && (
					<Suspense fallback={<Spinner />}>
						<EditModal handleClose={handleClose} product={editingProduct} />
					</Suspense>
				)}
			</div>
		</tr>
	);
};

export default memo(ProductRow);
