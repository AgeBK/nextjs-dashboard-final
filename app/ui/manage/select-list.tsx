import React from 'react';
import data from '@/app/lib/appData.json';
import stylesForm from '@/app/assets/css/manage/Form.module.css';
import { ddlWineItemsProps } from '@/app/lib/definitions';
import styles from '@/app/assets/css/Select.module.css';

export default function SelectLists({ ddlWineItems, isDelete }: ddlWineItemsProps) {
  const { region, packaging } = data;
  const arrList = [region, packaging];

  return (
    <>
      {Object.entries(ddlWineItems).map(([key, value], i: number) => {
        return (
          <div key={key}>
            <span className={stylesForm.key}>
              {key}
              <span className={stylesForm.required}>*</span>
            </span>
            <label htmlFor={key} id={`lbl${key}`}>
              <select
                id={key}
                name={key}
                className={styles.select}
                aria-labelledby="lblSort"
                defaultValue={value}
                required
                disabled={isDelete}
              >
                <option value="">-- Select {key} --</option>
                {arrList[i].map((val: string) => (
                  <option value={val} key={val}>
                    {val}
                  </option>
                ))}
              </select>
            </label>
          </div>
        );
      })}
    </>
  );
}
