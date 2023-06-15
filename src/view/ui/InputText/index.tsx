import { FC } from 'react';
import { IProduct } from 'src/controller/types';
import './styles.scss';

interface InputTextProps {
  label: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  onBlur?: (e: React.FocusEvent<any, Element>) => void;
  value?: string | number
  error?: any
  name?: string
}

const InputText: FC<InputTextProps> = ({
   label,
   onChange,
   onBlur,
   value,
   error,
   name
}) => {
  return (
    <div className='input-box'>
      <input
        type='text'
        required
        name={name}
        value={value}
        onError={error}
        className='input-box__text-field'
        onChange={onChange}
        onBlur={onBlur}
      />
      <span
        className='input-box__helper-text'
      >
        {label}
      </span>
    </div>
  );
}

export default InputText;