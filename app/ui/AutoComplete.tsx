'use client';

import { KeyboardEvent, SyntheticEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Autocomplete, Chip, TextField } from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { hyphenate } from '../lib/utils';
import { ProductProps, ACDataProps } from '../lib/definitions';
import usePageWidth from '@/app/hooks/usePageWidth';
import data from '@/app/lib/appData.json';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import Img from './image';
import styles from '../assets/css/AutoComplete.module.css';

const AutoComplete = ({ products }: ProductProps) => {
  const [overlay, setOverlay] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { MAX_SMALLSCREEN } = data;
  const isPageWidth: boolean = usePageWidth(MAX_SMALLSCREEN);

  const { replace } = useRouter();

  if (products) {
    const ACData = products.map(
      ({ name, id, category, variety, packaging }: ACDataProps) => {
        return { name, id, category, variety, packaging };
      },
    );

    const handleClick = (): void => setOverlay(true);

    const handleBlur = (): void => setOverlay(false);

    const handleChange = (
      _: SyntheticEvent<Element, Event>,
      val: ACDataProps | null,
    ): void => {
      if (val) {
        const { category, variety, id } = val;
        setOverlay(false);
        setOpen(false);
        replace(`/${category.toLowerCase()}/${hyphenate(variety)}/${id}`);
      }
    };

    const handleKeyDown = (
      e: KeyboardEvent<HTMLDivElement> & {
        defaultMuiPrevented?: boolean | undefined;
      },
    ): void => {
      const { key } = e;

      if (key === 'Enter' && searchTerm) {
        setOverlay(false);
        setOpen(false);
        replace(`/search=${searchTerm}`);
      }
    };

    const handleInputChange = (
      _: SyntheticEvent<Element, Event>,
      val: string,
    ): void => {
      setSearchTerm(val);
      if (val.length <= 1) {
        if (open) setOpen(false);
      } else if (!open) setOpen(true);
    };

    return (
      <section className={styles.container}>
        <div className={overlay ? styles.overlay : ''}></div>
        <Autocomplete
          open={open}
          onChange={(e, value) => handleChange(e, value)}
          onInputChange={(_, value) => handleInputChange(_, value)}
          onKeyDown={(e) => handleKeyDown(e)}
          getOptionLabel={(option: ACDataProps) => option.name}
          className={`${styles.autoComplete} ${
            overlay ? styles.pageWidth : ''
          }`}
          options={ACData}
          filterOptions={createFilterOptions({
            limit: 7,
          })}
          isOptionEqualToValue={(option, value) =>
            value === undefined || option.id === value.id
          }
          renderOption={(props, { id, name, packaging }, { inputValue }) => {
            const matches = match(name, inputValue);
            const parts = parse(name, matches);
            return (
              <li {...props} className={styles.listItem} key={id}>
                <div className={styles.itemCont}>
                  <div className={styles.itemImg}>
                    <Img
                      imgSrc={`wine/${id}.jpg`}
                      imgAlt={name}
                      imgWidth={packaging === 'Cask' ? 40 : 20}
                      imgHeight={60}
                    />
                  </div>
                  <div className={styles.itemLabel}>
                    {parts.map((part, index) => (
                      <span
                        style={{
                          fontWeight: part.highlight ? 700 : 400,
                        }}
                        key={index}
                      >
                        {part.text}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            );
          }}
          renderTags={(tagValue, getTagProps) => {
            return tagValue.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                label={option.id}
                key={option.id}
              />
            ));
          }}
          renderInput={(params) => (
            <TextField
              label={isPageWidth ? 'Search' : 'What are you looking for?'}
              {...params}
              className={styles.tf}
              onClick={handleClick}
              onBlur={handleBlur}
              sx={{
                '& .MuiOutlinedInput-root': {
                  paddingRight: '10px!important',
                },
              }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
        ></Autocomplete>
      </section>
    );
  }
  return null;
};

export default AutoComplete;
