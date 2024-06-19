'use client';

import { useEffect, useState, useMemo, useRef, Suspense } from 'react';
import {
  sortCategoryPageData,
  filterCategoryPageData,
  hyphenate,
} from '@/app/lib/utils';
import data from '@/app/lib/appData.json';
import CategoryList from './category-list';
import CategoryHeader from './category-header';
import CategoryToggleItems from './category-toggle-items';
import CategoryPaging from './category-paging';
import CategoryNoResults from './category-no-results';
import FilterList from '../filters/filter-list';
import usePageWidth from '@/app/hooks/usePageWidth';
import Blurb from '@/app/ui/blurb';
import {
  CategoryMainProps,
  DataProps,
  FilterProps,
  PagingProps,
} from '@/app/lib/definitions';
import header from '../header';
import Loading from '../loading';
const variety = '';
let products: DataProps[] = [];
import styles from '@/app/_assets/css/Category.module.css';

export default function CategoryMain({
  arr,
  urlCategory,
  urlVariety,
  isManage,
}: CategoryMainProps) {
  const { MAX_SMALLSCREEN, pagingSettings } = data;
  const [sortName, setSortName] = useState<string>('');
  const [filters, setFilters] = useState<FilterProps>({});
  const [paging, setPaging] = useState<PagingProps>(pagingSettings);
  const [isShowItems, setIsShowItems] = useState<boolean>(false);
  // const isSmallScreen: boolean = usePageWidth(MAX_SMALLSCREEN);
  const isSmallScreen: boolean = false; // TODO: ??
  const dataRef = useRef<DataProps[]>([]);
  const didMount = useRef<boolean>(false);
  const isSmallScreenShowItems = isSmallScreen && isShowItems;
  let strHeader = '';

  if (arr && dataRef.current.length === 0) {
    const variety = filters.variety || urlVariety;
    dataRef.current = arr;
  }

  useEffect(() => {
    if (didMount.current) {
      // reset page variables if URL changes, not on first load
      setSortName('');
      setFilters({});
      dataRef.current = [];
    } else {
      didMount.current = true;
    }
  }, [urlCategory, urlVariety]);

  const currentData = useMemo(() => {
    setPaging(pagingSettings);
    let arr = [...dataRef.current];
    if (arr.length) {
      if (Object.keys(filters).length) {
        arr = filterCategoryPageData(arr, filters);
      }
      if (sortName) {
        arr = sortCategoryPageData(arr, sortName);
      }
    }
    return arr;
  }, [filters, sortName]);

  const pagedData = currentData.slice(
    (paging.page - 1) * paging.pageSize,
    paging.page * paging.pageSize,
  );

  const updateFilters = (filter: FilterProps) =>
    setFilters({ ...filters, ...filter });

  const removeFilters = (val: string) => {
    if (val === 'all') {
      setFilters({});
    } else {
      delete filters[val as keyof FilterProps];
      setFilters({ ...filters });
    }
  };

  const updatePaging = ({ page, pageSize }: PagingProps) => {
    if (window) {
      window.scrollTo(0, 0);
      setPaging({ page, pageSize });
    }
  };

  const togglePageItems = () => {
    // either show filters or items on small screen
    setIsShowItems((prev) => !prev);
  };

  return (
    <>
      <Blurb
        urlCategory={urlCategory}
        variety={urlVariety || hyphenate(filters.variety)}
      />
      {isSmallScreen && (
        <CategoryToggleItems
          togglePageItems={togglePageItems}
          isItems={isSmallScreenShowItems}
        />
      )}
      <div className={styles.category}>
        <div
          className={
            isSmallScreenShowItems ? styles.itemCont : styles.filterCont
          }
        >
          <FilterList
            currentData={dataRef.current}
            filters={filters}
            urlVariety={urlVariety}
            updateFilters={updateFilters}
            isManage={isManage}
          />
        </div>
        <div
          className={
            isSmallScreenShowItems ? styles.filterCont : styles.itemCont
          }
        >
          <section className={styles.categoryItems}>
            <CategoryHeader
              filters={filters}
              removeFilters={removeFilters}
              dataLength={currentData.length}
              sortName={sortName}
              setSortName={setSortName}
            />
            {currentData.length > 0 ? (
              <>
                {/* <Suspense fallback={<Loading />}> */}
                <CategoryList arr={pagedData} isManage={isManage} />
                {/* </Suspense> */}

                <CategoryPaging
                  currentData={currentData}
                  paging={paging}
                  updatePaging={updatePaging}
                />
              </>
            ) : (
              <CategoryNoResults isManage={isManage} />
            )}
          </section>
        </div>
      </div>
    </>
  );
}

// const test = arr.reduce((acc, val) => {
//   let cat = 3;
//   if (val.category === 'Red') {
//     cat = 2;
//   } else if (val.category === 'White') {
//     cat = 1;
//   }
//   if (acc.indexOf(val.variety) === -1) {
//     acc = [...acc, val.variety];
//     test2.push([val.variety, cat]);
//   }
//   return acc;
// }, []);
// console.log('test');

// console.log(test);
// console.log(test2);

// let a = [
//   ['Pinot Noir', 2],
//   ['Sauvignon Blanc', 1],
//   ['Sem Sauv Blanc', 1],
//   ['Cabernet Sauvignon', 2],
//   ['Cabernet Merlot', 2],
//   ['Chardonnay', 1],
//   ['Blends', 2],
//   ['Cask', 2],
//   ['Shiraz', 2],
//   ['Fortified', 2],
//   ['Tempranillo', 2],
//   ['Moscato', 1],
//   ['Alternate', 1],
//   ['Pinot Gris Grigio', 1],
//   ['Cabernet Shiraz', 2],
//   ['Sweet', 3],
//   ['Sparkling White', 3],
//   ['Merlot', 2],
//   ['Sparkling Rose', 3],
//   ['Shiraz Cabernet', 2],
//   ['Sangiovese', 2],
//   ['Riesling', 1],
//   ['Semillon', 1],
//   ['Prosecco', 3],
//   ['Varieties', 2],
//   ['Champagne', 3],
//   ['Verdelho', 1],
//   ['Cava', 3],
//   ['Viognier', 1],
//   ['Desert', 1],
//   ['Red', 3],
//   ['Other Blends', 1],
//   ['Champagne Rose', 3],
//   ['Lambrusco', 2],
//   ['Chenin Blanc', 1],
//   ['Grenache', 2],
//   ['Other Varieties', 1],
//   ['Malbec', 2],
//   ['Petilant', 3],
//   ['Prosecco Rose', 3],
// ];
