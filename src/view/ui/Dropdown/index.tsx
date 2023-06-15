import { FC } from 'react';
import { useFormikContext } from 'formik';
import './styles.scss';

interface DropdownProps {
  name: string;
  label: string;
  onBlur: (e: React.FocusEvent<HTMLSelectElement, Element>) => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>, name: string) => void;
  error?: string | false;
}

const CategoryDropdown: FC<DropdownProps> = ({
  name,
  label,
  onBlur,
  error,
  value,
  onChange
}) => {

  return (
    <div className="category-dropdown">
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e, name)}
        onBlur={onBlur}
      >
        <option value="" disabled>{`Select a ${name}:`}</option>
        <option value="smartphones">Smartphones</option>
        <option value="laptops">Laptops</option>
        <option value="fragrances">Fragrances</option>
        <option value="skincare">Skincare</option>
        <option value="groceries">Groceries</option>
        <option value="home-decoration">Home Decoration</option>
      </select>
      {error && <p className='category-dropdown__error-message'>{error}</p>}
    </div>
  );
};

export default CategoryDropdown;