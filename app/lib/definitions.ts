// data definitions

import { ChangeEvent, ReactNode } from 'react';
import { z } from 'zod';

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
  imgAlt: string;
  imgWidth: number;
  imgHeight: number;
  imgPriority?: boolean;
};

export type ImgFillProps = {
  imgSrc: string;
  imgAlt: string;
  // imageStyle: keyof typeof styles;
  imgStyle: string;
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

export type ProductCartProps = {
  id: string;
  name: string;
  brand: string;
  price_current: number;
  short_name: string;
  price_two_for: number;
  price_ten_for: number;
  price_percent_off: number;
  packaging: string;
  promotion_callout_text?: string;
  promotion_discount_code?: string;
  isCask: boolean;
};

export type ProductRatingProps = {
  average: number;
  total: number;
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

export interface VarietyFilterProps extends WineFilterProps {
  currentData: DataProps[];
}

export interface WineFilterProps {
  updateFilters: (filters: FilterProps) => void;
  filters: FilterProps;
  isManage?: boolean;
}

export type FormStateProps = {
  message: string | null;
  // errors: Record<string, any>;
  errors: KeyStringProps;
  success: boolean | null;
};

export type BlurbProps = {
  urlCategory: string;
  variety?: string;
};

export type CarouselPagingProps = {
  items: number;
  pageIndex: number;
  setPageIndex: (prev: number) => void;
  handleClick: (prev: number) => void;
};

export type CartClosedProps = {
  totalPrice: number;
  totalQty: number;
};

export type CartQtyPriceProps = {
  totalQty: number;
  totalPrice: number;
};

export type CartPriceProps = {
  price: number;
  dealPrice?: number;
  quantity: number;
};

export type CartOpenProps = {
  totalPrice: number;
  totalQty: number;
  handleClose: () => void;
  discountCode: string;
  setDiscountCode: (code: string) => void;
};

export type ItemSavingsProps = {
  price: number;
  dealPrice?: number;
  quantity: number;
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

export type CategoryHeaderProps = {
  filters: FilterProps;
  removeFilters: (name: string) => void;
  dataLength: number;
  sortName: string;
  setSortName: (name: string) => void;
};

export type CategoryPageNumberProps = {
  currentData: DataProps[];
  paging: PagingProps;
  updatePaging: (paging: PagingProps) => void;
};

export type CategoryPagingProps = {
  currentData: DataProps[];
  paging: PagingProps;
  updatePaging: (paging: PagingProps) => void;
};

export type CategoryToggleItemsProps = {
  togglePageItems: () => void;
  isItems: boolean;
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

export type ManageProductActionsProps = {
  enableModal: (e: React.MouseEvent<Element, MouseEvent>) => void;
  isDelete: boolean;
};

export type ModalDeleteProps = {
  id: string;
  name: string;
  initialState: FormStateProps;
  setShowModal: (show: boolean) => void;
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

export type ManageUploadProps = {
  productId: string;
  setIsNewImage: (isNewImage: boolean) => void;
};

// export interface ManageImageProps extends ManageUploadProps {
export interface ManageImageProps {
  productId: string;
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

export type BreadCrumbProps = {
  urlCategory?: string;
  urlVariety?: string;
  category: string;
  variety: string;
};

export type HomeCampaignProps = {
  link: string;
  hdr: string;
  text: string;
  finePrint: string;
};

export type SchemaProps = z.ZodObject<
  Omit<
    {
      id: z.ZodString;
      brand: z.ZodString;
      name: z.ZodString;
      short_name: z.ZodString;
      category: z.ZodString;
      variety: z.ZodString;
      region: z.ZodString;
      packaging: z.ZodString;
      promotion_callout_text: z.ZodString;
      promotion_discount_code: z.ZodString;
      price_normal: z.ZodNumber;
      price_current: z.ZodNumber;
      volume_ml: z.ZodNumber;
      price_two_for: z.ZodNumber;
      price_ten_for: z.ZodNumber;
      price_percent_off: z.ZodNumber;
      ratings_total: z.ZodNumber;
      ratings_average: z.ZodNumber;
      unit_of_measure_label: z.ZodString;
    },
    'id'
  >,
  'strip',
  z.ZodTypeAny,
  {
    id: string;
    brand: string;
    name: string;
    short_name: string;
    category: string;
    variety: string;
    region: string;
    packaging: string;
    promotion_callout_text: string;
    promotion_discount_code: string;
    price_normal: number;
    price_current: number;
    volume_ml: number;
    price_two_for: number;
    price_ten_for: number;
    price_percent_off: number;
    ratings_total: number;
    ratings_average: number;
    unit_of_measure_label: string;
  },
  {
    brand: string;
    name: string;
    short_name: string;
    category: string;
    variety: string;
    region: string;
    packaging: string;
    promotion_callout_text: string;
    promotion_discount_code: string;
    price_normal: number;
    price_current: number;
    volume_ml: number;
    price_two_for: number;
    price_ten_for: number;
    price_percent_off: number;
    ratings_total: number;
    ratings_average: number;
    unit_of_measure_label: string;
  }
>;

export type validatedFieldsProps = {
  success: boolean;
  error?: { flatten: () => { fieldErrors: Record<string, string[]> } };
  data?: any;
};

//RTK slice
export type CartState = {
  cart: CartProps;
  price_two_forDeals: number[];
  price_ten_forDeals: number;
  promotionCode: string;
};
