import { useCallback, useState, useEffect } from 'react';
import classNames from 'classnames';

import InputNumber from '../InputNumber';
import CategoryDropdown from '../Dropdown';
import { castProperty } from 'src/controller/utils/helpers';
import { castedKeys, numericsSteps } from 'src/model/constants';
import { EProductsKeys, ESortTypes } from 'src/controller/enums';

import type { FC, ChangeEvent } from 'react';
import type { IProduct, TProductOnlyString } from 'src/controller/types';

import './styles.scss';

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

	const isSortable = [
		EProductsKeys.NAME,
		EProductsKeys.DESCRIPTION,
		EProductsKeys.PRICE,
		EProductsKeys.RATING,
		EProductsKeys.STOCK,
		EProductsKeys.CATEGORY,
	].some((value) => value === productKey);

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
		<div className={'table-header__container'}>
			<div className={'table-header__container--control'}>
				<div>{productKey}</div>
				{isSortable && (
					<div className={'table-header__container--control--sort'}>
						<img
							className={classNames('table-header__img', 'btn', {
								'table-header__active': currentSortType === ESortTypes.ZA && isSorted,
							})}
							src="images/buttons/upArrow.svg"
							alt={'DESC'}
							onClick={handleSortDESC}
						/>
						<img
							className={classNames('table-header__img', 'btn', {
								'table-header__active': currentSortType === ESortTypes.AZ && isSorted,
							})}
							src="images/buttons/downArrow.svg"
							alt={'ASC'}
							onClick={handleSortASC}
						/>
					</div>
				)}
			</div>
			{isSortable && (
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
								<InputNumber
									value={min ?? + totalMin}
									min={totalMin}
									max={totalMax}
									step={numericsSteps[productKey] || 1}
									onChange={handleMinFilter}
									className="table-header__input"
								>
									<h1 className="table-header__title">{'Min'}</h1>
								</InputNumber>
								<InputNumber
									value={max ?? totalMax}
									min={totalMin}
									max={totalMax}
									step={numericsSteps[productKey] || 1}
									onChange={handleMaxFilter}
									className="table-header__input"
								>
									<h1 className="table-header__title">{'Max'}</h1>
								</InputNumber>
							</div>
						)}
					</>
				</button>
			)}
		</div>
	);
};

export default TableHeaderCell;
