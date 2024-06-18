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
  twoFor?: number;
  tenFor?: number;
  percentOff?: number;
};

export type CategoryParamsProps = {
  params: { urlCategory: string; urlVariety: string };
};

// before item in cart
export type AddToCartProps = {
  id: string;
  name: string;
  brand: string;
  shortName: string;
  price: number;
  quantity: number;
  deal?: DealProps;
  discountCode?: string;
};

export type CartItemProps = {
  name: string;
  brand: string;
  short_name: string;
  price: number;
  quantity: number;
  deal?: {
    twoFor?: number;
    tenFor?: number;
    percentOff?: number;
  };
  discountCode?: string;
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
  searchId?: string;
  searchStr?: string;
  category?: string;
  price?: string;
  variety?: string;
  rating?: string;
  region?: KeyBooleanProps;
  isManage?: boolean;
};

export interface WineFilterProps {
  updateFilters: (filters: FilterProps) => void;
  filters: FilterProps;
}

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type FormStateProps = {
  message: string | null;
  errors: Record<string, any>;
};
