import { memo, useCallback, useState } from 'react';
import type { ChangeEvent, FC, ReactNode } from 'react';
import type { TProductOnlyString } from 'src/controller/types';

import Dropdown from '../Dropdown';
import MinMaxFilter from 'src/view/ui/MinMaxFilter';
import { numericsSteps } from 'src/model/constants';
import { EProductsKeys } from 'src/controller/enums';

interface FilterNodeProps {
	productKey: EProductsKeys;
	className?: string;
	totalMin: number;
	totalMax: number;
	onFiltersChange: (value: string, fieldName: keyof TProductOnlyString) => void;
	onMinMaxChage: (value: string, min?: number, max?: number) => void;
}

const FilterNode: FC<FilterNodeProps> = ({
	productKey,
	totalMin,
	totalMax,
	className,
	onFiltersChange,
	onMinMaxChage,
}) => {
	const [selectedCategory, setSelectedCategory] = useState<string>('');

	const renderMinMaxInput = useCallback(
		(label: string | ReactNode) => (
			<h1 className="table-header__title">{label}</h1>
		),
		[]
	);

	const handleChangeCategory = useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>) => {
			setSelectedCategory(e.target.value);
			onFiltersChange(
				e.target.value,
				productKey.toLocaleLowerCase() as keyof TProductOnlyString
			);
		},
		[onFiltersChange, productKey]
	);

	const handleSearchFilter = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			onFiltersChange(
				e.target.value,
				productKey.toLocaleLowerCase() as keyof TProductOnlyString
			);
		},
		[onFiltersChange, productKey]
	);

	switch (productKey) {
		case EProductsKeys.NAME:
		case EProductsKeys.DESCRIPTION:
			return (
				<div className={className}>
					<input
						type={'text'}
						onChange={handleSearchFilter}
						className="table-header__input--large"
					/>
				</div>
			);
		case EProductsKeys.PRICE:
		case EProductsKeys.RATING:
		case EProductsKeys.STOCK:
			return (
				<div className={className}>
					<MinMaxFilter
						{...{ totalMin, totalMax, productKey }}
						step={numericsSteps[productKey] || 1}
						className={'table-header__input'}
						onChange={onMinMaxChage}
						renderLabel={renderMinMaxInput}
					/>
				</div>
			);
		case EProductsKeys.CATEGORY:
			return (
				<Dropdown
					name={productKey}
					label={productKey}
					value={selectedCategory}
					onChange={handleChangeCategory}
					small={true}
				/>
			);
		default:
			return <></>;
	}
};

export default memo(FilterNode);
