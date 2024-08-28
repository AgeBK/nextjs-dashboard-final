'use client';

import { useEffect, useState, useMemo, useRef } from 'react';
import {
  sortCategoryPageData,
  filterCategoryPageData,
  hyphenate,
} from '@/app/lib/utils';
import {
  CategoryMainProps,
  DataProps,
  FilterProps,
  PagingProps,
} from '@/app/lib/definitions';
import usePageWidth from '@/app/hooks/usePageWidth';
import data from '@/app/lib/appData.json';
import CategoryList from './category-list';
import CategoryHeader from './category-header';
import CategoryToggleItems from './category-toggle-items';
import CategoryPaging from './category-paging';
import CategoryNoResults from './category-no-results';
import FilterList from '../filters/filter-list';
import Blurb from '../blurb';
import styles from '@/app/assets/css/category/Category.module.css';

// ui/components for category and manage products pages
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
  const isSmallScreen: boolean | undefined = usePageWidth(MAX_SMALLSCREEN);
  const dataRef = useRef<DataProps[]>([]);
  const didMount = useRef<boolean>(false);
  const isSmallScreenShowItems = isSmallScreen && isShowItems;
  dataRef.current = arr;

  console.log('CategoryMain');

  useEffect(() => {
    console.log('CategoryMain UE');
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
    console.log('currentData');

    setPaging(pagingSettings); // reset paging if datasource changes
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
  }, [filters, sortName, pagingSettings]);

  const pagedData = currentData.slice(
    (paging.page - 1) * paging.pageSize,
    paging.page * paging.pageSize,
  );

  // all data filters managed in filters state object
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
    // either show filters or products on small screen
    setIsShowItems((prev) => !prev);
  };

  return (
    <>
      {!isManage && (
        <Blurb
          urlCategory={urlCategory}
          variety={urlVariety || hyphenate(filters.variety)}
        />
      )}

      {isSmallScreen && (
        <CategoryToggleItems
          togglePageItems={togglePageItems}
          isSmallScreenShowItems={isSmallScreenShowItems}
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
                <CategoryList arr={pagedData} isManage={isManage} />
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
