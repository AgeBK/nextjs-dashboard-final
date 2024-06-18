import React, { ChangeEvent, useState } from 'react';
import { WineFilterProps } from '@/app/lib/definitions';
import styles from '@/app/_assets/css/manage/Form.module.css';
import { Button } from '../button';

export default function FilterId({ updateFilters, filters }: WineFilterProps) {
  const [value, setValue] = useState('');
  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setValue(value);
    updateFilters({ searchStr: value });
  };

  const clearSearch = () => {
    setValue('');
    updateFilters({ searchStr: '' });
  };

  return (
    <div className={styles.container}>
      <label htmlFor="searchStr">
        <h3 className={styles.hdr}>Search:</h3>
        <input
          type="text"
          name="searchStr"
          id="searchStr"
          onChange={handleChange}
          placeholder="Enter name/brand here"
          value={value}
        />
      </label>
      <Button css="manageFilter" onClick={clearSearch}>
        Clear
      </Button>
    </div>
  );
}
