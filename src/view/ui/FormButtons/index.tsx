import { memo } from 'react';
import type { FC } from 'react';

interface FormButtonsProps {
	label: string;
	className?: string;
	onCancel: () => void;
}

const FormButtons: FC<FormButtonsProps> = ({ label, onCancel, className }) => (
	<div className={className}>
		<button type='submit' className='form__button btn'>
			{label}
		</button>
		<button type='button' className='form__button btn' onClick={onCancel}>
			Cancel
		</button>
	</div>
);

export default memo(FormButtons);
