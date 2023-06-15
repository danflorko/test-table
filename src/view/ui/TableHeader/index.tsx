import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import CategoryDropdown from '../Dropdown';
import { ESortTypes } from 'src/controller/enums';

import type { FC } from 'react';
import type {
	IMinMaxValuesOfProducts,
	IProduct,
	TProductOnlyString,
} from 'src/controller/types';

import './styles.scss';

interface TableHeaderProps {
	isSorted: boolean;
	productKey: string;
	onSortTypeChange: (value: keyof IProduct, sortBy: string) => void;
	currentSortType: ESortTypes;
	onFiltersChange: (value: string, fieldName: keyof TProductOnlyString) => void;
	onMinMaxChage: (value: string, min?: string, max?: string) => void;
	minMaxValuesOfProducts: IMinMaxValuesOfProducts;
}

const TableHeader: FC<TableHeaderProps> = ({
	isSorted,
	productKey,
	currentSortType,
	minMaxValuesOfProducts,
	onSortTypeChange,
	onFiltersChange,
	onMinMaxChage,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [query, setQuery] = useState<string>('');
	const [min, setMin] = useState<string>('');
	const [max, setMax] = useState<string>('');
	const [selectedCategory, setSelectedCategory] = useState('');

	const handleSort = useCallback(
		(sortType: ESortTypes) => {
			const checkedSortType =
				currentSortType === sortType ? ESortTypes.DISABLE : sortType;

			onSortTypeChange(productKey as keyof IProduct, checkedSortType);
		},
		[onSortTypeChange, currentSortType, productKey]
	);

	const handleIsOpenChange = useCallback(() => {
		setIsOpen((prev) => !prev);
	}, []);

	const handleQueryChage = useCallback((value: string) => {
		setQuery(value);
	}, []);

	const handleMinChange = useCallback((value: string) => {
		setMin(value);
	}, []);

	const handleMaxChange = useCallback((value: string) => {
		setMax(value);
	}, []);

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

	useEffect(() => {
		switch (productKey) {
			case 'Price':
				setMin(minMaxValuesOfProducts.minPrice.toString());
				setMax(minMaxValuesOfProducts.maxPrice.toString());
				break;

			case 'Rating':
				setMin(minMaxValuesOfProducts.minRating.toString());
				setMax(minMaxValuesOfProducts.maxRating.toString());
				break;

			case 'Stock':
				setMin(minMaxValuesOfProducts.minStock.toString());
				setMax(minMaxValuesOfProducts.maxStock.toString());
				break;
		}
	}, []);

	return (
		<>
			{productKey}
			{['Name', 'Description', 'Price', 'Rating', 'Stock', 'Category'].some(
				(value) => value === productKey
			) && (
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
							{productKey === 'Name' || productKey === 'Description' ? (
								<div
									className="table-header__filters minmax"
									onBlur={() => {
										handleIsOpenChange();
										onFiltersChange(
											'',
											productKey.toLocaleLowerCase() as keyof TProductOnlyString
										);
									}}
								>
									<input
										onChange={(e) => handleQueryChage(e.target.value)}
										className="table-header__input--large"
									/>
									<button
										type="button"
										className="table-header__apply"
										onClick={() =>
											onFiltersChange(
												query,
												productKey.toLocaleLowerCase() as keyof TProductOnlyString
											)
										}
									>
										Apply
									</button>
								</div>
							) : productKey === 'Category' ? (
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
								<div
									className="table-header__filters"
									onBlur={() => {
										onMinMaxChage(productKey.toLocaleLowerCase());
										handleIsOpenChange();
									}}
								>
									<h1 className="table-header__title">{'Min'}</h1>
									<input
										value={min}
										onChange={(e) => handleMinChange(e.target.value)}
										className="table-header__input"
									/>
									<h1 className="table-header__title">{'Max'}</h1>
									<input
										value={max}
										onChange={(e) => handleMaxChange(e.target.value)}
										className="table-header__input"
									/>
									<div>
										<div className="table-header__filters-btn">
											<button
												type="button"
												className="table-header__apply"
												onClick={() =>
													onMinMaxChage(
														productKey.toLocaleLowerCase(),
														min,
														max
													)
												}
											>
												Apply
											</button>
										</div>
									</div>
								</div>
							)}
						</>
					</button>
				</>
			)}
		</>
	);
};

export default TableHeader;
