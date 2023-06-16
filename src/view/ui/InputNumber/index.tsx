import type { ChangeEvent, ReactNode, FC } from 'react';

interface InputNumberProps {
	value: number;
	min: number;
	max: number;
	step: number;
	className?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	children: ReactNode;
}

const InputNumber: FC<InputNumberProps> = ({
	value,
	min,
	max,
	step,
	className,
	onChange,
	children,
}) => {
	return (
		<div>
			<input
				{...{
					value,
					min,
					max,
					step,
					className,
					onChange,
				}}
				type={'number'}
			/>
      {children}
		</div>
	);
};

export default InputNumber;
