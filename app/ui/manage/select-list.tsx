import React from 'react';
import { DataProps } from '@/app/lib/definitions';
import { region, packaging } from '@/app/lib/appData.json';
import stylesEdit from '@/app/_assets/css/manage/Form.module.css';
import styles from '@/app/_assets/css/Select.module.css';

type ddlWineItemsProps = {
  obj: DataProps;
};

const SelectLists = ({ obj }: ddlWineItemsProps) => {
  const arrList = [region, packaging];
  return (
    <>
      {Object.entries(obj).map(([key, value], i: number) => {
        return (
          <div key={key}>
            <span className={stylesEdit.key}>
              {key}
              <span className={stylesEdit.required}>*</span>
            </span>
            <label htmlFor={key} id={`lbl${key}`}>
              <select
                id={key}
                name={key}
                className={styles.select}
                aria-labelledby="lblSort"
                defaultValue={value}
                required
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
};

export default SelectLists;
