import * as Yup from 'yup';
import { FC, memo } from 'react';
import { useFormik } from 'formik';

import InputText from 'src/view/ui/InputText';
import { useAppDispatch } from 'src/controller/utils/hooks';
import { addProduct } from 'src/model/reducers/products';
import CategoryDropdown from 'src/view/ui/Dropdown';

interface AddModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Name is required'),
  description: Yup.string(),
  price: Yup.number().positive('Price should be positive number').typeError('Must be a number').required('Price is required'),
  thumbnail: Yup.string()
  .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Enter valid URL for photo!'
  ),
  rating: Yup.number().positive().min(0, 'Min rating 0').max(5, 'Max rating 5').typeError('Must be a number').required('Rating is required'),
  stock: Yup.number().positive().integer('Must be an integer number').required('Stock is required'),
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

  console.log(formik.values);

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
          <CategoryDropdown
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
