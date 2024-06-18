import { Revenue } from './definitions';
import { MAX_CAROUSEL_PRODUCTS } from './appData.json';
import { DataProps, FilterProps } from './definitions';
import {
  fetchProductsByCat,
  fetchProductsByDealTwoForPrice,
  fetchProductsByDealTenForPrice,
  fetchProductsOnSpecial,
  fetchProductsBySearchTerm,
  fetchProductsByVariety,
  fetchProductsTwoForDeals,
  fetchProductsTenPercentOff,
  fetchProductsTenAndLess,
  fetchProductsTenFor100,
  fetchProductsPriceDrop,
} from '@/app/lib/data';

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generateYAxis = (revenue: Revenue[]) => {
  // Calculate what labels we need to display on the y-axis
  // based on highest record and in 1000s
  const yAxisLabels = [];
  const highestRecord = Math.max(...revenue.map((month) => month.revenue));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

// ***********************************************************************

const catPageData = async (arg1: string, arg2?: string) => {
  // console.log('CatPageData');

  // const sp = new URLSearchParams(location.pathname.substring(1));
  // console.log(sp);
  // console.log(arg1, arg2);

  let arr: DataProps[] = [];
  // let header: string = ""; TODO: NOT USING THIS NOW??

  // console.log('Cat page data');
  // console.log(arg1);

  if (
    // filter by 2 for XX deals
    arg1.startsWith('two-for') &&
    arg1 !== 'two-for-deals'
  ) {
    const price = Number(arg1.split('-')[2]);
    arr = await fetchProductsByDealTwoForPrice(price);
    // header = `2 for $${price}`;
  } else if (arg1.startsWith('search')) {
    const searchTerm = arg1.split('=')[1];
    // console.log(searchTerm);

    arr = await fetchProductsBySearchTerm(searchTerm);
    // header = `Search results for ${searchTerm}`;
  } else {
    switch (arg1) {
      case 'two-for-deals':
        arr = await fetchProductsTwoForDeals();
        // header = "2 for Deals";
        break;
      case 'ten-percent-off':
        arr = await fetchProductsTenPercentOff();
        // header = "10% OFF";
        break;
      case 'ten-and-less':
        arr = await fetchProductsTenAndLess();
        // header = "$10 and less";
        break;
      case 'ten-for-100':
        arr = await fetchProductsTenFor100();
        // header = "10 for $100";
        break;
      case 'price-drop':
        //  console.log('price-drop');
        arr = await fetchProductsPriceDrop();
        break;
      case 'white':
      case 'red':
      case 'sparkling':
        //  console.log('white red sparkling');
        arr = await fetchProductsByCat(capitalizeFirstLetter(arg1));
        break;
      default:
        break;
    }
  }

  if (arg2) {
    switch (arg1) {
      case 'search':
        arr = await fetchProductsBySearchTerm(capitalizeFirstLetter(arg1));
        // header = `results: ${query}`;
        break;
      case 'white':
      case 'red':
      case 'sparkling':
        arr = await fetchProductsByVariety(
          capitalizeFirstLetter(arg1),
          capitalizeFirstLetter(arg2),
        );
      default:
        break;
    }
  }
  return arr;
};

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const hyphenate = (text: string | undefined) =>
  typeof text === 'string' ? text.toLowerCase().replace(/ /gi, '-') : undefined;

const deHyphenate = (text: string) =>
  typeof text === 'string' && text.toLowerCase().replace(/-/gi, ' ');

// const randomProducts = (arr: DataProps[]) =>
//   arr.sort(() => 0.5 - Math.random());

// const homePageCarouselProducts = (arr: DataProps[]): DataProps[] => {
//   const products = arr
//     .filter(({ price_current, price_normal }) => price_current !== price_normal)
//     .slice(0, MAX_CAROUSEL_PRODUCTS);

//   return randomProducts(products);
// };

// const productPageCarouselProducts = (arr: DataProps[], wineVariety: string) => {
//   const products = arr
//     .filter(({ variety }) => hyphenate(variety) === wineVariety)
//     .slice(0, MAX_CAROUSEL_PRODUCTS);
//   return randomProducts(products);
// };

const checkDeals = (twoFor?: number, tenFor?: number, percentOff?: number) => {
  let deal = {};
  if (twoFor) {
    deal = { twoFor };
  } else if (tenFor) {
    deal = { tenFor };
  } else if (percentOff) {
    deal = { percentOff };
  }
  return deal;
};

// const categoryURLs = {
//   "price-drop": (all: DataProps[]) => {
//     return all.filter(({ price: { current, normal } }) => current !== normal);
//   },
//   "two-for-deals": (all: DataProps[]) => {
//     return all.filter(
//       ({ promotion: { calloutText } }) =>
//         calloutText && calloutText.startsWith("2 for")
//     );
//   },
//   "ten-percent-off": (all: DataProps[]) => {
//     return all.filter(
//       ({ promotion: { calloutText } }) =>
//         calloutText && calloutText.startsWith("10% OFF")
//     );
//   },
//   "ten-and-less": (all: DataProps[]) => {
//     return all.filter(({ price: { current } }) => current <= 10);
//   },
//   "ten-for-100": (all: DataProps[]) => {
//     return all.filter(({ price: { tenFor } }) => tenFor === 100);
//   },
//   "two-for-price": (all: DataProps[], price: number) => {
//     return all.filter(({ price: { twoFor } }) => twoFor === price);
//   },
//   variety: (all: DataProps[], variety: string) => {
//     return all.filter(
//       ({ variety, brand }) =>
//         hyphenate(variety) === variety || hyphenate(brand) === variety
//     );
//   },
//   search: (all: DataProps[], query: string) => {
//     return all.filter(({ name }) =>
//       name.toLowerCase().includes(query.toLowerCase())
//     );
//   },
//   category: (all: DataProps[], category: string) => {
//     return all.filter(({ category }) => category.toLowerCase() === category);
//   },
// };

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
  console.log(searchId);

  // const ids = [];

  // const test = arr.filter(({ id }) => {
  //   if (ids.indexOf(id) === -1) {
  //     ids.push(id);
  //     return false;
  //   } else {
  //     console.log('true');
  //     console.log(id);
  //     return true;
  //   }
  // });
  // console.log('test');
  // console.log(test);

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

export {
  capitalizeFirstLetter,
  hyphenate,
  deHyphenate,
  catPageData,
  // randomProducts,
  // homePageCarouselProducts,
  // productPageCarouselProducts,
  checkDeals,
  // categoryURLs,
  // categoryPageData,
  sortCategoryPageData,
  filterCategoryPageData,
};
