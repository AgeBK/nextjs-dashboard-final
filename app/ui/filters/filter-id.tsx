'use client';

import React, { ChangeEvent, useState } from 'react';
import { WineFilterProps } from '@/app/lib/definitions';
import Button from '../button';
import styles from '@/app/_assets/css/manage/Form.module.css';

const FilterId = ({ updateFilters, filters }: WineFilterProps) => {
  const [value, setValue] = useState('');
  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setValue(value);
    updateFilters({ searchId: value });
  };

  const clearSearch = () => {
    setValue('');
    updateFilters({ searchId: '' });
  };

  return (
    <div className={styles.container}>
      <label htmlFor="id">
        <h3 className={styles.hdr}>Id:</h3>
        <input
          type="text"
          name="id"
          id="id"
          onChange={handleChange}
          placeholder="Enter id here"
          value={value}
        />
      </label>
      <Button css="manageFilter" onClick={clearSearch}>
        Clear
      </Button>
    </div>
  );
};

export default FilterId;
