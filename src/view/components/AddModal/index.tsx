import * as Yup from 'yup';
import { FC, memo } from 'react';
import { useFormik } from 'formik';
import { validationSchema } from 'src/controller/utils/helpers'

import InputText from 'src/view/ui/InputText';
import { useAppDispatch } from 'src/controller/utils/hooks';
import { addProduct } from 'src/model/reducers/products';
import CategoryDropdown from 'src/view/ui/Dropdown';
import { IProduct } from 'src/controller/types';

interface AddModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const AddModal: FC<AddModalProps> = ({ isOpen, handleClose }) => {
  const dispatch = useAppDispatch();

  const productFromLocalStorage = localStorage.getItem('ProductAdd');
  const savedLocalStorageValues: IProduct = productFromLocalStorage ? JSON.parse(productFromLocalStorage) : {
    title: '',
    description: '',
    price: '',
    thumbnail: '',
    rating: '',
    stock: '',
    category: '',
  };

  const formik = useFormik({
    initialValues: savedLocalStorageValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(addProduct({
        ...values,
        price: +values.price,
        rating: +values.rating,
        stock: +values.stock,
      }))
      resetForm();
      localStorage.removeItem('ProductAdd');
    },
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, name: string) => {
    formik.handleChange(e);
    localStorage.setItem('ProductAdd', JSON.stringify({ ...formik.values, [name]: name === ('price' || 'stock' || 'rating') ? +e.target.value : e.target.value}));
  }

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
            onChange={handleOnChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && formik.errors.title}
          />
          <InputText
            name='description'
            label='Description'
            value={formik.values.description}
            onChange={handleOnChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && formik.errors.description}
          />
          <InputText
            name='price'
            label='Price'
            value={formik.values.price}
            onChange={handleOnChange}
            onBlur={formik.handleBlur}
            error={formik.touched.price && formik.errors.price}
          />
          <InputText
            name='rating'
            label='Rating'
            value={formik.values.rating}
            onChange={handleOnChange}
            onBlur={formik.handleBlur}
            error={formik.touched.rating && formik.errors.rating}
          />
          <InputText
            name='thumbnail'
            label='Photo'
            value={formik.values.thumbnail}
            onChange={handleOnChange}
            onBlur={formik.handleBlur}
            error={formik.touched.thumbnail && formik.errors.thumbnail}
          />
          <InputText
            name='stock'
            label='Stock'
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
