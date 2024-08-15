// data definitions

import { ChangeEvent, ReactNode } from 'react';

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
  promotion_discount_code?: string;
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
  urlVariety: string | undefined;
  isManage: boolean;
};

export type ButtonProps = {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<Element, MouseEvent>) => void;
  css: string;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button' | undefined;
};

export type ImgProps = {
  imgSrc: string;
  // imageStyle: keyof typeof styles;
  imgAlt: string;
  imgWidth: number;
  imgHeight: number;
  imgPriority?: boolean;
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

export type ProductInfoProps = {
  id: string;
  category: string;
  variety: string;
  brand: string;
  packaging: string;
  unitOfMeasureLabel: string;
  current: number;
  normal: number;
  short_name: string;
  urlCategory?: string;
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
  searchId?: string;
  searchStr?: string;
};

export interface RegionFilterProps extends WineFilterProps {
  currentData: DataProps[];
}

export interface WineFilterProps {
  updateFilters: (filters: FilterProps) => void;
  filters: FilterProps;
  isManage?: boolean;
}

export type FormStateProps = {
  message: string | null;
  errors: Record<string, any>;
  success: boolean | null;
};

export type BlurbProps = {
  urlCategory: string;
  variety?: string;
};

export type CartQtyPriceProps = {
  totalQty: number;
  totalPrice: number;
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

export type CategoryListProps = {
  arr: DataProps[];
  isManage?: boolean;
};

export type ProductDetailsProps = {
  id: string;
  name: string;
  brand: string;
  short_name: string;
  average: number;
  total: number;
  price_current: number;
  price_two_for: number;
  price_ten_for: number;
  price_percent_off: number;
  packaging: string;
  promotion_callout_text?: string;
  promotion_discount_code?: string;
  urlCategory?: string;
  urlVariety?: string;
  isCask: boolean;
};

export type ProductItemProps = {
  props: {
    id: string;
    category: string;
    variety: string;
    name: string;
    short_name: string;
    brand: string;
    packaging: string;
    ratings_average: number;
    price_current: number;
    price_normal: number;
    price_two_for: number;
    price_percent_off: number;
    price_ten_for: number;
    promotion_callout_text?: string;
    promotion_discount_code?: string;
  };
  ind: number;
  css?: string;
};

export type WineBlurbProps = {
  urlCategory: string | undefined;
  urlVariety: string | undefined;
};

export type ContainerProps = {
  children: ReactNode;
};

export type ddlWineItemsProps = {
  ddlWineItems: { [k: string]: string | number };
  isDelete: boolean;
};

export type ACDataProps = {
  name: string;
  id: string;
  category: string;
  variety: string;
  packaging: string;
};

export type ProductProps = {
  products: ACDataProps[];
};

export type InputFieldsProps = {
  product: DataProps;
  isDelete: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type UploadProps = {
  productId: string;
  productAdded: boolean | null;
};

export type ManageDBMessagesProps = {
  errorMessages: FormStateProps;
};

export type ManageProductProps = {
  product: DataProps;
  action: string;
  ddlWineItems: { [k: string]: string | number };
  ddlItems: { [k: string]: string | number };
};

export type ManagePageProps = {
  params: {
    action: string;
    id: string;
  };
};

export interface ManageImageProps extends UploadProps {
  action: string;
  packaging: string;
  isDelete: boolean;
}

export type ManageProductsProps = {
  props: {
    id: string;
    category: string;
    variety: string;
    name: string;
    brand: string;
    price_current: number;
    price_normal: number;
  };
};

export type ManageFilterProps = {
  filters: FilterProps;
  isManage?: boolean;
};

//RTK slice
export type CartState = {
  cart: CartProps;
  price_two_forDeals: number[];
  price_ten_forDeals: number;
  promotionCode: string;
};
