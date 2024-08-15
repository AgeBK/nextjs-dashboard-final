'use client';

import data from '@/app/lib/appData.json';
import { InputFieldsProps } from '@/app/lib/definitions';
import styles from '@/app/assets/css/manage/Form.module.css';

export default function InputFields({
  product,
  isDelete,
  handleChange,
}: InputFieldsProps) {
  const { isRequired } = data;
  return (
    <>
      {Object.entries(product).map(([key, value]: [string, any], i) => {
        const isReq = isRequired.includes(key);
        const dataType = typeof value === 'number' ? 'number' : 'text';
        return (
          <div key={key}>
            <label htmlFor={key} id={`lbl${key}`}>
              <span className={styles.key}>
                {key.replaceAll('_', ' ')}
                {isReq && <span className={styles.required}>*</span>}
              </span>
            </label>
            <input
              id={key}
              name={key}
              onChange={handleChange}
              className={styles.input}
              type={dataType}
              defaultValue={value}
              aria-labelledby={`lbl${key}`}
              disabled={(key === 'id' && value) || isDelete}
              required={isReq}
            />
          </div>
        );
      })}
    </>
  );
}
