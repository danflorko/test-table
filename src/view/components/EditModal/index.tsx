import { useFormik } from 'formik';
import { FC } from 'react';
import { IProduct } from 'src/controller/types';
import { useAppDispatch } from 'src/controller/utils/hooks';
import { editProduct } from 'src/model/reducers/products';
import InputText from 'src/view/ui/InputText';
import { validationSchema } from 'src/controller/utils/helpers'
import CategoryDropdown from 'src/view/ui/Dropdown';

interface EditModalProps {
	handleClose: () => void;
	product: IProduct;
};

const EditModal: FC<EditModalProps> = ({ product, handleClose }) => {
	const { id, title, description, price, thumbnail, rating, stock, category } =
		product;
	const dispatch = useAppDispatch();

	const formik = useFormik({
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
      localStorage.removeItem('Product');
		},
	});

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, name: string) => {
    formik.handleChange(e);
    localStorage.setItem('Product', JSON.stringify({ ...formik.values, id: product.id, [name]: name === ('price' || 'stock' || 'rating') ? +e.target.value : e.target.value}));
  }

	return (
		<>
			<div className="products__close btn" onClick={handleClose}>
				<img src="images/buttons/close.svg" />
			</div>
			<form className="products__add-form" onSubmit={formik.handleSubmit}>
				<div className="form__fields">
					<InputText
						name="thumbnail"
						value={formik.values.thumbnail}
						onChange={handleOnChange}
						onBlur={formik.handleBlur}
						error={formik.touched.thumbnail && formik.errors.thumbnail}
						label="Photo"
					/>
					<InputText
						name="title"
						value={formik.values.title}
						onChange={handleOnChange}
						onBlur={formik.handleBlur}
						error={formik.touched.title && formik.errors.title}
						label="Name"
					/>
					<InputText
						name="description"
						value={formik.values.description}
						onChange={handleOnChange}
						onBlur={formik.handleBlur}
						error={formik.touched.description && formik.errors.description}
						label="Description"
					/>
					<InputText
						name="price"
						value={formik.values.price}
						onChange={handleOnChange}
						onBlur={formik.handleBlur}
						error={formik.touched.price && formik.errors.price}
						label="Price"
					/>
					<InputText
						name="rating"
						label="Rating"
						value={formik.values.rating}
						onChange={handleOnChange}
						onBlur={formik.handleBlur}
						error={formik.touched.rating && formik.errors.rating}
					/>
					<InputText
						name="stock"
						label="Stock"
						value={formik.values.stock}
						onChange={handleOnChange}
						onBlur={formik.handleBlur}
						error={formik.touched.stock && formik.errors.stock}
					/>
					<CategoryDropdown
            name='category'
            label='Category'
            value={formik.values.category}
            onChange={handleOnChange}
            onBlur={formik.handleBlur}
            error={formik.touched.category && formik.errors.category}
          />
				</div>
				<div className="form__buttons">
					<button type="submit" className="form__button btn">
						Edit
					</button>
					<button
						type="button"
						className="form__button btn"
						onClick={handleClose}
					>
						Cancel
					</button>
				</div>
			</form>
		</>
	);
};

export default EditModal;
