import { memo, useCallback } from 'react';
import { useFormik } from 'formik';
import type { IProduct } from 'src/controller/types';
import type { FC } from 'react';

import FormButtons from 'src/view/ui/FormButtons';
import ProductForm from 'src/view/components/ProductForm';
import { useAppDispatch, useAppSelector } from 'src/controller/utils/hooks';
import { addProduct } from 'src/model/reducers/products';
import {
	productRequestBuilder,
	validationSchema,
} from 'src/controller/utils/helpers';

interface AddModalProps {
	isOpen: boolean;
	handleClose: () => void;
}

const AddModal: FC<AddModalProps> = ({ isOpen, handleClose }) => {
	const dispatch = useAppDispatch();
	const { products } = useAppSelector((s) => s.products);

	const productFromLocalStorage = localStorage.getItem('ProductAdd');
	const savedLocalStorageValues: Partial<IProduct> = productFromLocalStorage
		? JSON.parse(productFromLocalStorage)
		: {
				title: '',
				description: '',
				price: '',
				thumbnail: '',
				rating: '',
				stock: '',
				category: '',
		  };

	const formik = useFormik<Partial<IProduct>>({
		initialValues: savedLocalStorageValues,
		validationSchema,
		onSubmit: (values, { resetForm }) => {
			dispatch(
				addProduct({
					...values,
					id: Math.max(...products.map((product) => product.id)) + 1,
					price: +values.price!,
					rating: +values.rating!,
					stock: +values.stock!,
				})
			);
			resetForm();
			handleClose();
		},
	});

	const handleOnChange = useCallback(
		(
			e:
				| React.ChangeEvent<HTMLInputElement>
				| React.ChangeEvent<HTMLSelectElement>,
			name: string
		) => {
			formik.handleChange(e);
			productRequestBuilder(formik.values, name, e.target.value, 'Add');
		},
		[formik]
	);

	return (
		<div
			className={isOpen ? 'products__add-modal active' : 'products__add-modal'}
		>
			<form className="products__add-form" onSubmit={formik.handleSubmit}>
				<ProductForm
					formik={formik}
					skippedValues={['id']}
					className={'form__fields'}
					onChange={handleOnChange}
				/>
				<FormButtons
					label={'Add'}
					className={'form__buttons'}
					onCancel={handleClose}
				/>
			</form>
		</div>
	);
};

export default memo(AddModal);
