import type { FC } from 'react';
import './styles.scss';

interface InputTextProps {
	label: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
	value?: string | number;
	error?: string | false;
	name?: string;
}

const InputText: FC<InputTextProps> = ({
	label,
	onChange,
	onBlur,
	value,
	error,
	name,
}) => {
	return (
		<div className='input-box'>
			<input
				type='text'
				required
				name={name}
				value={value}
				placeholder={error || ''}
				className={error ? 'input-box__text-field input-box__text-field--error' : 'input-box__text-field'}
				onChange={onChange}
				onBlur={onBlur}
			/>
      {error && <p className='input-box__error-message'>{error}</p>}
			<span className={error ? 'input-box__helper-text error' : 'input-box__helper-text'}>{label}</span>
		</div>
	);
};

export default InputText;
