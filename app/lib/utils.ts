import { DataProps, FilterProps } from './definitions';
import {
  fetchProductsByCat,
  fetchProductsPriceTwoFor,
  fetchProductsBySearchTerm,
  fetchProductsByVariety,
  fetchProductsPriceTwoForDeals,
  fetchProductsPriceTenPercentOff,
  fetchProductsTenAndLess,
  fetchProductsPriceTenFor100,
  fetchProductsPriceDrop,
  fetchCarouselProductsByVariety,
  fetchCarouselProducts,
} from '@/app/lib/data';

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

const fetchCategoryPageData = async (arg1: string, arg2?: string) => {
  let arr: DataProps[] = [];
  // TODO: netlify version
  console.log('fetchCategoryPageData');
  console.log(arg1);
  console.log(arg2);

  if (arg2) {
    switch (arg1) {
      case 'search': // TODO:
        arr = await fetchProductsBySearchTerm(capitalizeFirstLetter(arg1));
        break;
      case 'white':
      case 'red':
      case 'sparkling':
        arr = await fetchProductsByVariety(
          capitalizeFirstLetter(arg1),
          capitalizeFirstLetter(arg2),
        );
        break;
      default:
        break;
    }
  } else {
    console.log('else');

    if (
      // filter by 2 for XX deals
      arg1.startsWith('two-for') &&
      arg1 !== 'two-for-deals'
    ) {
      const price = Number(arg1.split('-')[2]);
      arr = await fetchProductsPriceTwoFor(price);
    } else if (arg1.startsWith('search')) {
      const searchTerm = arg1.replace('search%3D', ''); // TODO: search%3Dpenf
      arr = await fetchProductsBySearchTerm(searchTerm);
    } else {
      switch (arg1) {
        case 'two-for-deals':
          arr = await fetchProductsPriceTwoForDeals();
          break;
        case 'ten-percent-off':
          arr = await fetchProductsPriceTenPercentOff();
          break;
        case 'ten-and-less':
          arr = await fetchProductsTenAndLess();
          break;
        case 'ten-for-100':
          arr = await fetchProductsPriceTenFor100();
          break;
        case 'price-drop':
          arr = await fetchProductsPriceDrop();
          break;
        case 'white':
        case 'red':
        case 'sparkling':
          arr = await fetchProductsByCat(capitalizeFirstLetter(arg1));
          break;
        default:
          break;
      }
    }
  }

  return arr;
};

const fetchCarouselData = async (variety?: string) => {
  let carouselProducts: DataProps[] = [];
  if (variety) {
    carouselProducts = await fetchCarouselProductsByVariety(variety);
  } else {
    carouselProducts = await fetchCarouselProducts();
  }
  return carouselProducts;
};

const capitalizeFirstLetter = (string: string) => {
  const words = string
    .split(' ')
    .map((val) => val.charAt(0).toUpperCase() + string.slice(1));
  return words.join('');
};

const hyphenate = (text: string | undefined) =>
  typeof text === 'string' ? text.toLowerCase().replace(/ /gi, '-') : undefined;

const deHyphenate = (text: string) =>
  typeof text === 'string' && text.toLowerCase().replace(/-/gi, ' ');

const checkDeals = (
  price_two_for: number,
  price_ten_for: number,
  price_percent_off: number,
) => {
  const twoFor = Number(price_two_for);
  const tenFor = Number(price_ten_for);
  const percentOff = Number(price_percent_off);
  let deal = {};
  if (twoFor) {
    deal = { price_two_for: twoFor };
  } else if (tenFor) {
    deal = { price_ten_for: tenFor };
  } else if (percentOff) {
    deal = { price_percent_off: percentOff };
  }
  return deal;
};

const alphabetically = (arr: DataProps[], reverseOrder: boolean) => {
  arr.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1));
  if (reverseOrder) arr.reverse();
  return arr;
};

const financially = (arr: DataProps[], reverseOrder: boolean) => {
  arr.sort((a, b) => (a.price_current < b.price_current ? -1 : 1));
  if (reverseOrder) arr.reverse();
  return arr;
};

const saleItemsFirst = (arr: DataProps[]) => {
  arr.sort(({ price_current, price_normal }) =>
    price_current < price_normal ? -1 : 1,
  );
  return arr;
};

const sortCategoryPageData = (arr: DataProps[], value: string) => {
  switch (value) {
    case 'a-z':
      arr = alphabetically(arr, false);
      break;
    case 'z-a':
      arr = alphabetically(arr, true);
      break;
    case '$':
      arr = financially(arr, false);
      break;
    case '$$$':
      arr = financially(arr, true);
      break;
    case 'sale':
    case 'relevance':
      arr = saleItemsFirst(arr);
      break;
    default:
      break;
  }
  return arr;
};

const filterCategoryPageData = (arr: DataProps[], filters: FilterProps) => {
  const { searchId, searchStr, category, variety, price, rating, region } =
    filters;

  if (searchId) {
    arr = arr.filter(({ id }) => id.startsWith(searchId));
  }

  if (searchStr) {
    arr = arr.filter(
      ({ name, brand }) =>
        name.toLowerCase().indexOf(searchStr) > -1 ||
        brand.toLowerCase().indexOf(searchStr) > -1,
    );
  }

  if (category) {
    arr = arr.filter(({ category: wineCategory }) => wineCategory === category);
  }

  if (variety) {
    arr = arr.filter(({ variety: wineVariety }) => wineVariety === variety);
  }

  if (price) {
    const [min, max] = price.split('-');
    arr = arr.filter(
      ({ price_current }) =>
        price_current >= Number(min) && price_current < Number(max),
    );
  }

  if (rating) {
    arr = arr.filter(
      ({ ratings_average }) => Math.round(ratings_average) === Number(rating),
    );
  }

  if (region) {
    const checked = Object.keys(region).filter((key) => region[key]);
    if (checked.length) {
      arr = arr.filter(({ region }) => checked.includes(region));
    }
  }
  return arr;
};

const validImage = async (url: string) => {
  try {
    await new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(url);
      img.onerror = () => {
        reject();
      };
    });
    return true;
  } catch {
    return false;
  }
};

const uploadImg = async (file: Blob, productId: string) => {
  const fileName: string = `${productId}.jpg`;
  const formData = new FormData();
  formData.append('file', file, fileName);
  console.log('ManageUpload uploadImg - elem');

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();
  console.log(result);

  if (result.success) {
    console.log('ManageUpload image uploaded SUCCESS');
    // window.location.href = '/manage';
    console.log('Upload ok : ' + result.name);
    return true;
  } else {
    console.log('ManageUpload image uploaded FAILED');
    return false;
    // alert('Upload failed');
  }
};

export {
  capitalizeFirstLetter,
  hyphenate,
  deHyphenate,
  fetchCategoryPageData,
  checkDeals,
  sortCategoryPageData,
  filterCategoryPageData,
  fetchCarouselData,
  validImage,
  uploadImg,
};
