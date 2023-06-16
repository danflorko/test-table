import { memo, useCallback, useEffect, useState } from 'react';
import type { ChangeEvent, FC, ReactNode } from 'react';

import InputNumber from '../InputNumber';
import { EProductsKeys } from 'src/model/enums';

interface MinMaxFilterProps {
	step: number;
	totalMin: number;
	totalMax: number;
	productKey: EProductsKeys;
	className: string;
	onChange: (value: string, min?: number, max?: number) => void;
	renderLabel?: (label: string) => ReactNode;
}

const MinMaxFilter: FC<MinMaxFilterProps> = ({
	step,
	totalMin,
	totalMax,
	productKey,
	className,
	onChange,
	renderLabel,
}) => {
	const [min, setMin] = useState<number>();
	const [max, setMax] = useState<number>();

	useEffect(() => {
		setMin(totalMin);
		setMax(totalMax);
	}, [totalMin, totalMax]);

	const handleMinFilter = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const value = +e.target.value;

			setMin(value);
			onChange(productKey.toLocaleLowerCase(), value, max);
		},
		[onChange, productKey, max]
	);

	const handleMaxFilter = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const value = +e.target.value;

			setMax(value);
			onChange(productKey.toLocaleLowerCase(), min, value);
		},
		[onChange, productKey, min]
	);

	return (
		<>
			<InputNumber
				key={`filter-min`}
				value={min ?? totalMin}
				min={totalMin}
				max={totalMax}
				step={step}
				onChange={handleMinFilter}
				className={className}
			>
				{!!renderLabel && renderLabel('Min')}
			</InputNumber>
			<InputNumber
				key={`filter-max`}
				value={max ?? totalMax}
				min={totalMin}
				max={totalMax}
				step={step}
				onChange={handleMaxFilter}
				className={className}
			>
				{!!renderLabel && renderLabel('Max')}
			</InputNumber>
		</>
	);
};

export default memo(MinMaxFilter);
