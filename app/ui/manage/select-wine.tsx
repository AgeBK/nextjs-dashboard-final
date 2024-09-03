'use client';

import React, { useState } from 'react';
import data from '@/app/lib/appData.json';
import { ddlWineItemsProps } from '@/app/lib/definitions';
import stylesForm from '@/app/assets/css/manage/Form.module.css';
import styles from '@/app/assets/css/Select.module.css';

export default function SelectWine({
  ddlWineItems,
  isDelete,
}: ddlWineItemsProps) {
  // category / variety drop downs on add/edit/delete manage product page
  const { category } = ddlWineItems;
  const [wineCategory, setWineCategory] = useState(category);
  const { categoryArr, red, white, sparkling } = data;
  let varietyArr: string[] = [];

  const handleChange = ({ target: { value } }: { target: { value: string } }) =>
    setWineCategory(value);

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
        <span className={stylesForm.key}>
          Category
          <span className={stylesForm.required}>*</span>
        </span>
        <label htmlFor="category" id="lblCategory">
          <select
            id="category"
            name="category"
            onChange={handleChange}
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
        <span className={stylesForm.key}>
          Variety
          <span className={stylesForm.required}>*</span>
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
}
