import { FC } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputText from 'src/view/elements/InputText';
import { useAppDispatch } from 'src/controller/utils/hooks';
import { addProduct } from 'src/model/reducers/products';

interface AddModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Name is required'),
  author: Yup.string().required('Author is required'),
  publicationYear: Yup.string().required('Publication Year is required'),
  rating: Yup.number().required('Rating is required'),
});

const AddModal: FC<AddModalProps> = ({ isOpen, handleClose }) => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      publicationYear: '',
      rating: '',
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(addProduct(values))
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
            name='author'
            label='Author'
            value={formik.values.author}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.author && formik.errors.author}
          />
          <InputText
            name='publicationYear'
            label='Publication Year'
            value={formik.values.publicationYear}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.publicationYear && formik.errors.publicationYear}
          />
          <InputText
            name='rating'
            label='Rating'
            value={formik.values.rating}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.rating && formik.errors.rating}
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

export default AddModal;
