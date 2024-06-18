import CategoryFilter from './filter-category';
import IdFilter from './filter-id';
import SearchFilter from './filter-search';
import PriceFilter from './filter-price';
import RatingFilter from './filter-rating';
import VarietyFilter from './filter-variety';
import RegionFilter from './filter-region';
import { signOut } from '@/auth';
import { DataProps, FilterProps } from '@/app/lib/definitions';
import styles from '@/app/_assets/css/FilterList.module.css';

type FilterListProps = {
  currentData: DataProps[];
  filters: FilterProps;
  urlVariety?: string;
  isManage: boolean;
  updateFilters: (filters: {
    searchId?: string;
    searchStr?: string;
    category?: string;
    variety?: string;
    price?: string;
    rating?: string;
    // id?: string;
  }) => void;
};

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

  const handleChange = ({
    target: { id, value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    updateFilters({ [id]: value.toLowerCase() });

  return (
    <section className={styles.container}>
      {/* <form
        action={async () => {
          "use server";
          await signOut();
        }}
      ></form> */}

      <div className={styles.hdrCont}>
        <h2 className={styles.hdr}>{isManage ? 'Filter' : 'Refine:'}</h2>
      </div>

      <ul className={styles.filterList}>
        {/* <ul role="radiogroup"> */}

        {isManage && (
          <>
            <li>
              <IdFilter filters={filters} updateFilters={updateFilters} />
            </li>{' '}
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
            <CategoryFilter
              updateFilters={updateFilters}
              filters={filters}
              // currentData={currentData}
            />
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
