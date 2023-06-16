import { useCallback, useState, useEffect } from 'react';
import classNames from 'classnames';
import CategoryDropdown from '../Dropdown';
import { castProperty } from 'src/controller/utils/helpers';
import { EProductsKeys, ESortTypes } from 'src/controller/enums';

import type { FC, ChangeEvent } from 'react';
import type {
	ICastedKeys,
	INumericSteps,
	IProduct,
	TProductOnlyString,
} from 'src/controller/types';

import './styles.scss';

export const numericsSteps: INumericSteps = {
	Price: 1,
	Rating: 0.1,
	Stock: 1,
};

export const castedKeys: ICastedKeys = {
	[EProductsKeys.ID]: 'id',
	[EProductsKeys.NAME]: 'title',
	[EProductsKeys.DESCRIPTION]: 'description',
	[EProductsKeys.PRICE]: 'price',
	[EProductsKeys.PHOTO]: 'thumbnail',
	[EProductsKeys.RATING]: 'rating',
	[EProductsKeys.STOCK]: 'stock',
	[EProductsKeys.CATEGORY]: 'category',
};

interface TableHeaderCellProps {
	totalMin: number;
	totalMax: number;
	isSorted: boolean;
	productKey: EProductsKeys;
	currentSortType: ESortTypes;
	onSortTypeChange: (value: keyof IProduct, sortBy: string) => void;
	onFiltersChange: (value: string, fieldName: keyof TProductOnlyString) => void;
	onMinMaxChage: (value: string, min?: number, max?: number) => void;
}

const TableHeaderCell: FC<TableHeaderCellProps> = ({
	totalMin = 0,
	totalMax = 99999,
	isSorted,
	productKey,
	currentSortType,
	onSortTypeChange,
	onFiltersChange,
	onMinMaxChage,
}) => {
	const [min, setMin] = useState<number>();
	const [max, setMax] = useState<number>();
	const [selectedCategory, setSelectedCategory] = useState<string>('');

	useEffect(() => {
		setMin(totalMin);
		setMax(totalMax);
	}, [totalMin, totalMax]);

	const handleSort = useCallback(
		(sortType: ESortTypes) => {
			const checkedSortType = castProperty<ESortTypes>(
				ESortTypes.DISABLE,
				currentSortType,
				sortType
			);

			onSortTypeChange(
				castedKeys[productKey] as keyof IProduct,
				checkedSortType
			);
		},
		[onSortTypeChange, currentSortType, productKey]
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

	const handleSortASC = useCallback(() => {
		handleSort(ESortTypes.AZ);
	}, [handleSort]);

	const handleSortDESC = useCallback(() => {
		handleSort(ESortTypes.ZA);
	}, [handleSort]);

	console.log(min, max);

	const handleSearchFilter = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			onFiltersChange(
				e.target.value,
				productKey.toLocaleLowerCase() as keyof TProductOnlyString
			);
		},
		[onFiltersChange, productKey]
	);

	const handleMinFilter = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const value = +e.target.value;

			setMin(value);
			onMinMaxChage(productKey.toLocaleLowerCase(), value, max);
		},
		[onMinMaxChage, productKey, max]
	);

	const handleMaxFilter = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const value = +e.target.value;

			setMax(value);
			onMinMaxChage(productKey.toLocaleLowerCase(), min, value);
		},
		[onMinMaxChage, productKey, min]
	);

	return (
		<>
			{productKey}
			{[
				EProductsKeys.NAME,
				EProductsKeys.DESCRIPTION,
				EProductsKeys.PRICE,
				EProductsKeys.RATING,
				EProductsKeys.STOCK,
				EProductsKeys.CATEGORY,
			].some((value) => value === productKey) && (
				<>
					<div>
						<img
							className={classNames('table-header__img', 'btn', {
								active: currentSortType === ESortTypes.ZA && isSorted,
							})}
							src="images/buttons/upArrow.svg"
							alt={'DESC'}
							onClick={handleSortDESC}
						/>
						<img
							className={classNames('table-header__img', 'btn', {
								active: currentSortType === ESortTypes.AZ && isSorted,
							})}
							src="images/buttons/downArrow.svg"
							alt={'ASC'}
							onClick={handleSortASC}
						/>
					</div>
					<button type="button" className="table-header__btn">
						<>
							{productKey === EProductsKeys.NAME ||
							productKey === EProductsKeys.DESCRIPTION ? (
								<div className="table-header__filters minmax">
									<input
										onChange={handleSearchFilter}
										className="table-header__input--large"
									/>
								</div>
							) : productKey === EProductsKeys.CATEGORY ? (
								<>
									<CategoryDropdown
										name={productKey}
										label={productKey}
										value={selectedCategory}
										onChange={handleChangeCategory}
										small={true}
									/>
								</>
							) : (
								<div className="table-header__filters">
									<h1 className="table-header__title">{'Min'}</h1>
									<input
										value={min}
										min={min}
										max={max}
										step={numericsSteps[productKey]}
										type={'number'}
										onChange={handleMinFilter}
										className="table-header__input"
									/>
									<h1 className="table-header__title">{'Max'}</h1>
									<input
										value={max}
										min={min}
										max={max}
										step={numericsSteps[productKey]}
										type={'number'}
										onChange={handleMaxFilter}
										className="table-header__input"
									/>
								</div>
							)}
						</>
					</button>
				</>
			)}
		</>
	);
};

export default TableHeaderCell;
