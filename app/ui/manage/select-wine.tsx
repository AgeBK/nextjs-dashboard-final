'use client';

import React, { useState } from 'react';
import { categoryArr, red, white, sparkling } from '@/app/lib/appData.json';
import styles from '@/app/assets/css/Select.module.css';
import { KeyStringProps } from '@/app/lib/definitions';
import stylesEdit from '@/app/assets/css/manage/Form.module.css';

type ddlWineItemsProps = {
  ddlWineItems: KeyStringProps;
  isDelete: boolean;
};

const SelectWine = ({ ddlWineItems, isDelete }: ddlWineItemsProps) => {
  const { category, packaging, region, variety } = ddlWineItems;
  const [wineCategory, setWineCategory] = useState(category);
  let varietyArr: string[] = [];

  const handleCatChange = (e: any) => {
    setWineCategory(e.target.value);
  };

  switch (wineCategory) {
    case 'Red':
      varietyArr = red;
      break;
    case 'White':
      varietyArr = white;
      break;
    case 'Sparkling':
      varietyArr = sparkling;
      break;
    default:
      break;
  }

  return (
    <>
      <div>
        <span className={stylesEdit.key}>
          Category
          <span className={stylesEdit.required}>*</span>
        </span>
        <label htmlFor="category" id="lblCategory">
          <select
            id="category"
            name="category"
            onChange={handleCatChange}
            className={styles.select}
            aria-labelledby="lblCategory"
            defaultValue={ddlWineItems.category}
            required
            disabled={isDelete}
          >
            <option value="">-- Select Category --</option>
            {categoryArr.map((val: string) => (
              <option value={val} key={val}>
                {val}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <span className={stylesEdit.key}>
          Variety
          <span className={stylesEdit.required}>*</span>
        </span>
        <label htmlFor="variety" id="lblVariety">
          <select
            id="variety"
            name="variety"
            className={styles.select}
            aria-labelledby="lblVariety"
            defaultValue={ddlWineItems.variety}
            required
            disabled={isDelete}
          >
            <option value="">-- Select Variety --</option>
            {varietyArr.map((val: string) => (
              <option value={val} key={val}>
                {val}
              </option>
            ))}
          </select>
        </label>
      </div>
    </>
  );
};

export default SelectWine;
