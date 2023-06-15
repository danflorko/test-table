import { useCallback, useState } from 'react';
import type { FC } from 'react';
import type { IProduct, TProductOnlyString } from 'src/controller/types';
import { ESortTypes } from 'src/controller/enums';
import './styles.scss';

interface TableHeaderProps {
  productKey: string;
  onSortTypeChange: (value: keyof IProduct, sortBy: string) => void;
  currentSortType: ESortTypes;
  onFiltersChange: (value: string, fieldName: keyof TProductOnlyString) => void;
  onMinMaxChage: (value: string, min?: string, max?: string) => void;
}

const TableHeader: FC<TableHeaderProps> = ({
  productKey,
  onSortTypeChange,
  currentSortType,
  onFiltersChange,
  onMinMaxChage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState<string>('');
  const [min, setMin] = useState<string>('');
  const [max, setMax] = useState<string>('');

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

  return (
    <>
      {productKey}
      {(productKey === 'Name' ||
        productKey === 'Description' ||
        productKey === 'Price' ||
        productKey === 'Rating' ||
        productKey === 'Stock' ||
        productKey === 'Category') && (
          <>
            <img
              className={`table-header__img btn ${currentSortType === ESortTypes.ZA ? 'active' : ''
                }`}
              src="images/buttons/upArrow.svg"
              onClick={() => handleSort(ESortTypes.ZA)}
            />
            <img
              className={`table-header__img btn ${currentSortType === ESortTypes.AZ ? 'active' : ''
                }`}
              src="images/buttons/downArrow.svg"
              onClick={() => handleSort(ESortTypes.AZ)}
            />
            <button type="button" className="table-header__btn">

              <>
                {productKey === 'Name' ||
                  productKey === 'Description' ||
                  productKey === 'Category' ? (
                  <div className="table-header__filters minmax" onBlur={() => {
                    handleIsOpenChange();
                    onFiltersChange(
                      '',
                      productKey.toLocaleLowerCase() as keyof TProductOnlyString
                    );
                  }}>
                    <input
                      onChange={(e) => handleQueryChage(e.target.value)}
                      className='table-header__input--large'
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
                ) : (
                  <div className="table-header__filters" onBlur={() => {
                    onMinMaxChage(productKey.toLocaleLowerCase());
                    handleIsOpenChange();
                  }}>
                    <h1 className='table-header__title'>{'Min'}</h1>
                    <input
                      value={min}
                      onChange={(e) => handleMinChange(e.target.value)}
                      className='table-header__input'
                    />
                    <h1 className='table-header__title'>{'Max'}</h1>
                    <input
                      value={max}
                      onChange={(e) => handleMaxChange(e.target.value)}
                      className='table-header__input'
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
