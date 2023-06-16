import { FC } from 'react';
import './styles.scss';
import classNames from 'classnames';

interface DropdownProps {
	name: string;
	label: string;
	onBlur?: (e: React.FocusEvent<HTMLSelectElement, Element>) => void;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>, name: string) => void;
	error?: string | false;
	small?: boolean;
}

const CategoryDropdown: FC<DropdownProps> = ({
	name,
	onBlur,
	error,
	value,
	onChange,
	small = false,
}) => {
	return (
		<div
			className={classNames(
				'category-dropdown',
				{
          'table-header__filters category-dropdown--small': small
        }
			)}
		>
			<select
				name={name}
				value={value}
				onChange={(e) => onChange(e, name)}
				onBlur={onBlur}
				className={small ? 'small' : 'category-dropdown__select'}
			>
				<option value="" disabled>{`Select a ${name}:`}</option>
				{small && <option value="">All</option>}
				<option value="smartphones">Smartphones</option>
				<option value="laptops">Laptops</option>
				<option value="fragrances">Fragrances</option>
				<option value="skincare">Skincare</option>
				<option value="groceries">Groceries</option>
				<option value="home-decoration">Home Decoration</option>
			</select>
			{error && <p className="category-dropdown__error-message">{error}</p>}
		</div>
	);
};

export default CategoryDropdown;
