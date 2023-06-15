import { useFormik } from 'formik';
import { FC } from 'react';
import { IProduct } from 'src/controller/types';
import { useAppDispatch } from 'src/controller/utils/hooks';
import { editProduct } from 'src/model/reducers/products';
import InputText from 'src/view/elements/InputText';
import * as Yup from 'yup';

interface EditModalProps {
  handleClose: () => void
  product: IProduct
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number().required('Price is required'),
  thumbnail: Yup.string().required('Photo is required'),
  rating: Yup.number().required('Rating is required'),
  stock: Yup.number().required('Stock is required'),
  category: Yup.string().required('Category is required')
});

const EditModal: FC<EditModalProps> = ({
  product,
  handleClose
}) => {
  const {
    id,
    title,
    description,
    price,
    thumbnail,
    rating,
    stock,
    category
  } = product;
  const dispatch = useAppDispatch();


  const formik = useFormik({
    initialValues: {
      title,
      description,
      price,
      thumbnail,
      rating,
      stock,
      category
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(editProduct({id, values}))
    }
  });

  return (
    <>
      <div
        className='products__close btn'
        onClick={handleClose}
      >
        <img src='images/buttons/close.svg' />
      </div>
      <form className='products__add-form' onSubmit={formik.handleSubmit}>
        <div className='form__fields'>
          <InputText
            name='title'
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && formik.errors.title}
            label='Name'
          />
          <InputText
            name='description'
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && formik.errors.description}
            label='Description'
          />
          <InputText
            name='price'
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.price && formik.errors.price}
            label='Price'
          />
          <InputText
            name='thumbnail'
            value={formik.values.thumbnail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.thumbnail && formik.errors.thumbnail}
            label='Photo'
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
          <button
            type='submit'
            className='form__button btn'
          >
            Edit
          </button>
          <button
            type='button'
            className='form__button btn'
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

export default EditModal;