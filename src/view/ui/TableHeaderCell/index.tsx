import { useCallback } from 'react';
import type { FC } from 'react';
import type { IProduct, IProductFilters, TProductOnlyString } from 'src/controller/types';

import Sorter from 'src/view/ui/Sorter';
import FilterNode from 'src/view/ui/FilterNode';
import { castProperty } from 'src/controller/utils/helpers';
import { castedKeys } from 'src/model/constants';
import { EProductsKeys, ESortTypes } from 'src/controller/enums';

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
  setFilters: React.Dispatch<React.SetStateAction<Partial<IProductFilters> | null>>
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
  setFilters,
}) => {
  const isSortable = [
    EProductsKeys.NAME,
    EProductsKeys.DESCRIPTION,
    EProductsKeys.PRICE,
    EProductsKeys.RATING,
    EProductsKeys.STOCK,
    EProductsKeys.CATEGORY,
  ].some((value) => value === productKey);

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

  const handleClearAllFilters = () => {
    setFilters(null);
  }

  return (
    <div className={'table-header__container'}>
      <div className={'table-header__container--control'}>
        {productKey === 'Actions' ? (
          <button
            className='table-header__clear-filters btn'
            type='button'
            onClick={() => handleClearAllFilters()
            }
          >
            <p>Clear<br />
              filters</p>
          </button>
        ) : (
          <div>{productKey}</div>
        )}
        {isSortable && (
          <Sorter
            isActive={isSorted}
            sortType={currentSortType}
            onChange={handleSort}
            className={'table-header__container--control--sort'}
          />
        )}
      </div>
      <FilterNode
        {...{
          productKey,
          totalMin,
          totalMax,
          onFiltersChange,
          onMinMaxChage,
        }}
        className={'table-header__filters'}
      />
    </div>
  );
};

export default TableHeaderCell;
