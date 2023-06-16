import { useCallback } from 'react';
import classNames from 'classnames';
import type { FC, ChangeEvent } from 'react';

import './styles.scss';

interface InputTextProps {
	label: string;
	name?: string;
	value?: string | number;
	error?: string | false;
	onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
	onChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
}

const InputText: FC<InputTextProps> = ({
	label,
	onChange,
	onBlur,
	value,
	error,
	name = '',
}) => {
	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			onChange(e, name);
		},
		[onChange, name]
	);

	return (
		<div className='input-box'>
			<input
				type='text'
				name={name}
				value={value}
				placeholder={error || ''}
				className={classNames('input-box__text-field', {
					'input-box__text-field--error': error,
				})}
				onChange={handleChange}
				onBlur={onBlur}
			/>
			{!!error && <p className='input-box__error-message'>{error}</p>}
			<span
				className={classNames('input-box__helper-text', {
					error,
				})}
			>
				{label}
			</span>
		</div>
	);
};

export default InputText;
