import type { FC } from 'react';
import './styles.scss';

interface InputTextProps {
	label: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
	value?: string | number;
	error?: string | boolean;
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
		<div className="input-box">
			<input
				type="text"
				required
				name={name}
				value={value}
				onError={error}
				className="input-box__text-field"
				onChange={onChange}
				onBlur={onBlur}
			/>
			<span className="input-box__helper-text">{label}</span>
		</div>
	);
};

export default InputText;
