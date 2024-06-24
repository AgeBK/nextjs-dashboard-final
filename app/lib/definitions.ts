// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.

export type DataProps = {
  id: string;
  name: string;
  brand: string;
  variety: string;
  category: string;
  region: string;
  volume_ml: number;
  packaging: string;
  short_name: string;
  unit_of_measure_label: string;
  ratings_average: number;
  ratings_total: number;
  price_normal: number;
  price_ten_for: number;
  price_two_for: number;
  price_current: number;
  price_percent_off: number;
  promotion_callout_text: string;
  promotion_discount_code: string;
};

export type DealProps = {
  price_two_for?: number;
  price_ten_for?: number;
  price_percent_off?: number;
};

export type CategoryParamsProps = {
  params: { urlCategory: string; urlVariety: string };
};

// before item in cart
export type AddToCartProps = {
  id: string;
  name: string;
  brand: string;
  short_name: string;
  price: number;
  quantity: number;
  deal?: DealProps;
  promotion_discount_code?: string; // TODO:
};

export type CartItemProps = {
  name: string;
  brand: string;
  short_name: string;
  price: number;
  quantity: number;
  deal?: {
    price_two_for?: number;
    price_ten_for?: number;
    price_percent_off?: number;
  };
  promotion_discount_code?: string;
  dealPrice?: number;
};

// item in cart
export type CartProps = {
  [id: string]: CartItemProps;
};

export type CategoryMainProps = {
  arr: DataProps[];
  urlCategory: string;
  urlVariety: string;
  isManage: boolean;
};

export type CampainMiniProps = {
  id: number;
  link: string;
  hdr: string;
  blurb1: string;
  blurb2: string;
  imgSrc: string;
  imgAlt: string;
};

export type ProductReviewProps = {
  urlCategory: string;
  variety: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type TextValueArrProps = { text: string; value: string };

export type PagingProps = { page: number; pageSize: number };

export type KeyStringProps = { [key: string]: string };

export type KeyNumberProps = { [key: string]: number };

export type KeyBooleanProps = { [key: string]: boolean };

export type FilterProps = {
  category?: string;
  price?: string;
  variety?: string;
  rating?: string;
  region?: KeyBooleanProps;
};

export type ManageFilterProps = {
  filters: FilterProps;
  isManage?: boolean;
  searchId?: string;
  searchStr?: string;
};

export interface WineFilterProps {
  updateFilters: (filters: FilterProps) => void;
  filters: FilterProps;
  isManage?: boolean;
}

export type FormStateProps = {
  message: string | null;
  errors: Record<string, any>;
};

export type BlurbProps = {
  urlCategory: string;
  variety?: string;
};

export type FilterListProps = {
  currentData: DataProps[];
  filters: FilterProps;
  urlVariety?: string;
  isManage: boolean;
  updateFilters: (filters: {
    searchId?: string;
    searchStr?: string;
    category?: string;
    variety?: string;
    price?: string;
    rating?: string;
  }) => void;
};
