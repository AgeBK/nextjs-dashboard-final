'use client';

import { CartProps, KeyNumberProps } from '../lib/definitions';

const checkDiscountCode = (cart: CartProps, promotionCode: string) => {
  Object.values(cart).forEach((cartItem) => {
    const { price, promotionDiscountCode, deal } = cartItem;
    if (promotionDiscountCode && deal) {
      const { pricePercentOff } = deal;
      if (
        pricePercentOff &&
        promotionDiscountCode.toLowerCase() === promotionCode.toLowerCase()
      ) {
        cartItem.dealPrice = Number(
          ((price / 100) * (100 - pricePercentOff)).toFixed(2),
        );
      } else if (
        promotionDiscountCode.toLowerCase() !== promotionCode.toLowerCase() &&
        cartItem.dealPrice
      ) {
        delete cartItem.dealPrice;
      }
    }
  });

  return cart;
};

const checkMultiBuys = (
  cart: CartProps,
  deal: KeyNumberProps,
  isRemove: boolean,
  items: number,
) => {
  const dealType = Object.keys(deal)[0];
  const dealPrice = Object.values(deal)[0];

  Object.values(cart).forEach((cartItem) => {
    const { deal } = cartItem;
    if (deal) {
      const currentDealType = Object.keys(deal)[0];
      const currentDealPrice = Object.values(deal)[0];
      if (currentDealType === dealType && currentDealPrice === dealPrice) {
        if (isRemove) {
          delete cartItem.dealPrice;
        } else {
          cartItem.dealPrice = dealPrice / items;
        }
      }
    }
  });
  return cart;
};

const storeCart = (cart: CartProps) => {
  sessionStorage.setItem('AKWineCart', JSON.stringify(cart));
};

export { checkDiscountCode, checkMultiBuys, storeCart };
