import CategoryFilter from './filter-category';
import IdFilter from './filter-id';
import SearchFilter from './filter-search';
import PriceFilter from './filter-price';
import RatingFilter from './filter-rating';
import VarietyFilter from './filter-variety';
import RegionFilter from './filter-region';
import { FilterListProps } from '@/app/lib/definitions';
import styles from '@/app/assets/css/filter/FilterList.module.css';

const FilterList = ({
  currentData,
  filters,
  urlVariety,
  updateFilters,
  isManage,
}: FilterListProps) => {
  const filterArr = [
    <PriceFilter
      updateFilters={updateFilters}
      filters={filters}
      key="PriceFilter"
    />,
    <RatingFilter
      filters={filters}
      updateFilters={updateFilters}
      key="RatingFilter"
      isManage={isManage}
    />,
    <RegionFilter
      filters={filters}
      updateFilters={updateFilters}
      key="RegionFilter"
      currentData={currentData}
    />,
  ];

  return (
    <section className={styles.container}>
      <div className={styles.hdrCont}>
        <h2 className={styles.hdr}>{isManage ? 'Filter' : 'Refine:'}</h2>
      </div>
      <ul className={styles.filterList}>
        {isManage && (
          <>
            <li>
              <IdFilter filters={filters} updateFilters={updateFilters} />
            </li>
            <li>
              <SearchFilter filters={filters} updateFilters={updateFilters} />
            </li>
          </>
        )}
        {filterArr.map((val) => {
          return <li key={val.key}>{val}</li>;
        })}
        {isManage && (
          <li>
            <CategoryFilter updateFilters={updateFilters} filters={filters} />
          </li>
        )}
        {!urlVariety && (
          <li>
            <VarietyFilter
              updateFilters={updateFilters}
              filters={filters}
              currentData={currentData}
            />
          </li>
        )}
      </ul>
    </section>
  );
};

export default FilterList;
