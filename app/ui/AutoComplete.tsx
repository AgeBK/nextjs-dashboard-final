"use client";
import { KeyboardEvent, SyntheticEvent, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import useWindowDimensions from "../hooks/useWindowDimensions";
// import { useNavigate } from "react-router-dom";
// import { useGetWinesQuery } from "../../services/API";
import { Autocomplete, TextField } from "@mui/material";
import { createFilterOptions } from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
// import { hyphenate } from "../../data/utils";
import { MAX_SMALLSCREEN } from "../lib/appData.json";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
// import usePageWidth from "../../hooks/usePageWidth";
import Img from "./image";
import styles from "../_assets/css/AutoComplete.module.css";
import { hyphenate } from "../lib/utils";
import { fetchProducts } from "../lib/data";
import { DataProps } from "../lib/definitions";

type ACDataProps = {
  name: string;
  id: string;
  category: string;
  variety: string;
  packaging: string;
};

type ProductProps = {
  products: DataProps[];
};

const AutoComplete = ({ products }: ProductProps) => {
  const [overlay, setOverlay] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  // const isPageWidth: boolean = usePageWidth(MAX_SMALLSCREEN);
  // const navigate = useNavigate();

  const searchParams = useSearchParams();
  const pathname = usePathname(); // You can use Next.js's useRouter and usePathname hooks to update the URL
  const { replace } = useRouter();

  if (products) {
    const ACData = products.map(
      ({ name, id, category, variety, packaging }: ACDataProps) => {
        return { name, id, category, variety, packaging };
      }
    );

    const handleClick = (): void => setOverlay(true);

    const handleBlur = (): void => setOverlay(false);

    const handleChange = (
      _: SyntheticEvent<Element, Event>,
      val: ACDataProps | null
    ): void => {
      if (val) {
        const { category, variety, id } = val;
        setOverlay(false);
        setOpen(false);
        // navigate(`/${category.toLowerCase()}/${hyphenate(variety)}/${id}`);

        // const params = new URLSearchParams(searchParams);
        // params.set("page", "1");

        // if (term) {
        //   params.set("query", term);
        // } else {
        //   params.delete("query");
        // }
        replace(`/${category.toLowerCase()}/${hyphenate(variety)}/${id}`);
      }
    };

    const handleKeyDown = (
      e: KeyboardEvent<HTMLDivElement> & {
        defaultMuiPrevented?: boolean | undefined;
      }
    ): void => {
      const { key } = e;

      if (key === "Enter" && searchTerm) {
        setOverlay(false);
        setOpen(false);
        replace(`/search=${searchTerm}`);
      }
    };

    const handleInputChange = (
      _: SyntheticEvent<Element, Event>,
      val: string
    ): void => {
      setSearchTerm(val);
      if (val.length <= 1) {
        if (open) setOpen(false);
      } else if (!open) setOpen(true);
    };

    return (
      <section className={styles.container}>
        <div className={overlay ? styles.overlay : ""}></div>
        <Autocomplete
          open={open}
          onChange={(e, value) => handleChange(e, value)}
          onInputChange={(_, value) => handleInputChange(_, value)}
          onKeyDown={(e) => handleKeyDown(e)}
          getOptionLabel={(option: ACDataProps) => option.name}
          className={`${styles.autoComplete} ${
            overlay ? styles.pageWidth : ""
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
              <li key={id} {...props} className={styles.listItem}>
                <div className={styles.itemCont}>
                  <div className={styles.itemImg}>
                    <Img
                      imageSrc={`wine/${id}.jpg`}
                      imageStyle={
                        packaging === "Bottle" ? "acBottle" : "acCask"
                      }
                      imageAlt={name}
                      imageWidth={20}
                      imageHeight={60}
                    />
                  </div>
                  <div className={styles.itemLabel}>
                    {parts.map((part, index) => (
                      <span
                        key={index}
                        style={{
                          fontWeight: part.highlight ? 700 : 400,
                        }}
                      >
                        {part.text}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              // label={isPageWidth ? "Search" : "What are you looking for?"}
              label="What are you looking for?"
              {...params}
              className={styles.tf}
              onClick={handleClick}
              onBlur={handleBlur}
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
