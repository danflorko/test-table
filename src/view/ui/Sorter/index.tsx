import { memo, useCallback } from 'react';
import classNames from 'classnames';
import { ESortTypes } from 'src/model/enums';
import type { FC } from 'react';

interface SorterProps {
	isActive: boolean;
	sortType: ESortTypes;
	onChange: (sortType: ESortTypes) => void;
	className?: string;
}

const Sorter: FC<SorterProps> = ({
	isActive,
	sortType,
	onChange,
	className,
}) => {
	const handleSortASC = useCallback(() => {
		onChange(ESortTypes.ASC);
	}, [onChange]);

	const handleSortDESC = useCallback(() => {
		onChange(ESortTypes.DESC);
	}, [onChange]);

	return (
		<div className={className}>
			<img
				className={classNames('table-header__img', 'btn', {
					'table-header__active': sortType === ESortTypes.DESC && isActive,
				})}
				src='images/buttons/upArrow.svg'
				alt={'DESC'}
				onClick={handleSortDESC}
			/>
			<img
				className={classNames('table-header__img', 'btn', {
					'table-header__active': sortType === ESortTypes.ASC && isActive,
				})}
				src='images/buttons/downArrow.svg'
				alt={'ASC'}
				onClick={handleSortASC}
			/>
		</div>
	);
};

export default memo(Sorter);
