import * as Yup from 'yup';
import { FC, memo } from 'react';
import { useFormik } from 'formik';

import InputText from 'src/view/ui/InputText';
import { useAppDispatch } from 'src/controller/utils/hooks';
import { addProduct } from 'src/model/reducers/products';

interface AddModalProps {
	isOpen: boolean;
	handleClose: () => void;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.string().required('Price is required'),
  thumbnail: Yup.string(),
  rating: Yup.number().required('Rating is required'),
  stock: Yup.number().required('Stock is required'),
  category: Yup.string().required('Category is required'),
});

const AddModal: FC<AddModalProps> = ({ isOpen, handleClose }) => {
	const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: '',
      thumbnail: '',
      rating: '',
      stock: '',
      category: '',
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(addProduct({
        ...values,
        price: +values.price,
        rating: +values.rating,
        stock: +values.stock,
      }))
      localStorage.removeItem('ProductAdd');
    },
  });

  return (
    <div className={isOpen ? 'products__add-modal active' : 'products__add-modal'}>
      <div className='products__close btn' onClick={handleClose}>
        <img src='images/buttons/close.svg' alt='Close' />
      </div>
      <form className='products__add-form' onSubmit={formik.handleSubmit}>
        <div className='form__fields'>
          <InputText
            name='title'
            label='Name'
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && formik.errors.title}
          />
          <InputText
            name='description'
            label='Description'
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && formik.errors.description}
          />
          <InputText
            name='price'
            label='Price'
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.price && formik.errors.price}
          />
          <InputText
            name='rating'
            label='Rating'
            value={formik.values.rating}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.rating && formik.errors.rating}
          />
          <InputText
            name='thumbnail'
            label='Photo'
            value={formik.values.thumbnail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.thumbnail && formik.errors.thumbnail}
          />
          <InputText
            name='stock'
            label='Stock'
            value={formik.values.stock}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.stock && formik.errors.stock}
          />
          <InputText
            name='category'
            label='Category'
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.category && formik.errors.category}
          />
        </div>
        <div className='form__buttons'>
          <button type='submit' className='form__button btn'>
            Add
          </button>
          <button type='button' className='form__button btn' onClick={handleClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default memo(AddModal);
