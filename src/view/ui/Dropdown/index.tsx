import { useCallback } from 'react';
import classNames from 'classnames';

import { useAppSelector } from 'src/controller/utils/hooks';
import type { ChangeEvent, FC } from 'react';
import type { IProduct } from 'src/controller/types';

import './styles.scss';

interface DropdownProps {
	name: string;
	label: string;
	value: string;
	error?: string | false;
	small?: boolean;
	onBlur?: (e: React.FocusEvent<HTMLSelectElement, Element>) => void;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>, name: string) => void;
}

const Dropdown: FC<DropdownProps> = ({
	name,
	onBlur,
	error,
	value,
	onChange,
	small = false,
}) => {
	const categories = useAppSelector((store) =>
		store.products.products.reduce(
			(uniques, { category }) =>
				uniques.includes(category) ? uniques : [...uniques, category],
			[] as IProduct['category'][]
		)
	);

	const handleChange = useCallback(
		(e: ChangeEvent<HTMLSelectElement>) => {
			onChange(e, name);
		},
		[onChange, name]
	);

	return (
		<div
			className={classNames('category-dropdown', {
				'table-header__filters category-dropdown--small': small,
			})}
		>
			<select
				{...{ name, value, onBlur }}
				onChange={handleChange}
				className={small ? 'small' : 'category-dropdown__select'}
			>
				<option
					key={'all-small'}
					value=''
					disabled
				>{`Select a ${name}:`}</option>
				{small && (
					<option key={'all'} value=''>
						All
					</option>
				)}
				{categories.map((category) => (
					<option key={`product-${category}`} value={category}>
						{category}
					</option>
				))}
			</select>
			{error && <p className='category-dropdown__error-message'>{error}</p>}
		</div>
	);
};

export default Dropdown;
