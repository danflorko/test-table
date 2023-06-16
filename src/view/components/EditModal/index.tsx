import { useCallback } from 'react';
import { useFormik } from 'formik';
import type { FC } from 'react';
import type { IProduct } from 'src/controller/types';

import Dropdown from 'src/view/ui/Dropdown';
import FormButtons from 'src/view/ui/FormButtons';
import ProductForm from 'src/view/components/ProductForm';
import { useAppDispatch } from 'src/controller/utils/hooks';
import { editProduct } from 'src/model/reducers/products';
import {
	productRequestBuilder,
	validationSchema,
} from 'src/controller/utils/helpers';

interface EditModalProps {
	product: IProduct;
	handleClose: () => void;
}

const EditModal: FC<EditModalProps> = ({ product, handleClose }) => {
	const { id, title, description, price, thumbnail, rating, stock, category } =
		product;
	const dispatch = useAppDispatch();

	const formik = useFormik<Partial<IProduct>>({
		initialValues: {
			title,
			description,
			price,
			thumbnail,
			rating,
			stock,
			category,
		},
		validationSchema,
		onSubmit: (values) => {
			dispatch(editProduct({ id, values }));
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
			productRequestBuilder(
				{ ...formik.values, id: product.id } as IProduct,
				name,
				e.target.value
			);
		},
		[formik, product.id]
	);

	return (
		<>
			<form className='products__add-form' onSubmit={formik.handleSubmit}>
				<ProductForm
					formik={formik}
					skippedValues={['id', 'category']}
					className={'form__fields'}
					onChange={handleOnChange}
				>
					<Dropdown
						name='category'
						label='Category'
						value={formik.values.category ?? ''}
						onChange={handleOnChange}
						onBlur={formik.handleBlur}
						error={formik.touched.category && formik.errors.category}
					/>
				</ProductForm>
				<FormButtons
					label={'Edit'}
					className={'form__buttons'}
					onCancel={handleClose}
				/>
			</form>
		</>
	);
};

export default EditModal;
