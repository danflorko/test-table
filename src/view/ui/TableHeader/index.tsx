import { useCallback, useEffect, useState } from 'react';
import type { FC } from 'react';
import type { IMinMaxValuesOfProducts, IProduct, TProductOnlyString } from 'src/controller/types';
import { ESortTypes } from 'src/controller/enums';
import './styles.scss';
import CategoryDropdown from '../Dropdown';

interface TableHeaderProps {
  productKey: string;
  onSortTypeChange: (value: keyof IProduct, sortBy: string) => void;
  currentSortType: ESortTypes;
  onFiltersChange: (value: string, fieldName: keyof TProductOnlyString) => void;
  onMinMaxChage: (value: string, min?: string, max?: string) => void;
  minMaxValuesOfProducts: IMinMaxValuesOfProducts
}

const TableHeader: FC<TableHeaderProps> = ({
  productKey,
  onSortTypeChange,
  currentSortType,
  onFiltersChange,
  onMinMaxChage,
  minMaxValuesOfProducts,
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

  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>, name: string) => {
    setSelectedCategory(e.target.value)
    onFiltersChange(
      e.target.value,
      productKey.toLocaleLowerCase() as keyof TProductOnlyString
    )
  };

  console.log(min, max);

  useEffect(() => {
    switch (productKey) {
      case 'Price':
        setMin(minMaxValuesOfProducts.minPrice.toString());
        setMax(minMaxValuesOfProducts.maxPrice.toString())
        break;

      case 'Rating':
        setMin(minMaxValuesOfProducts.minRating.toString());
        setMax(minMaxValuesOfProducts.maxRating.toString())
        break;

      case 'Stock':
        setMin(minMaxValuesOfProducts.minStock.toString());
        setMax(minMaxValuesOfProducts.maxStock.toString())
        break;
      default:
        break;
    }
  }, [])

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
                  productKey === 'Description' ? (
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
