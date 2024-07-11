import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  checkDiscountCode,
  checkMultiBuys,
  checkStorage,
  storeCart,
} from './cartUtils';
import { AddToCartProps, CartState } from '../lib/definitions';

const initialState: CartState = {
  cart: checkStorage(),
  price_two_forDeals: [],
  price_ten_forDeals: 0,
  promotionCode: '',
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<AddToCartProps>) => {
      const {
        id,
        name,
        brand,
        short_name,
        price,
        quantity,
        deal,
        promotion_discount_code,
      } = action.payload;

      const { cart, price_two_forDeals, promotionCode } = state;

      if (cart[id]) {
        state.cart[id].quantity += quantity;
      } else {
        state.cart[id] = {
          name,
          brand,
          short_name,
          price,
          quantity,
          deal,
          promotion_discount_code,
        };
      }

      // monitor products in multibuy deals
      if (deal && quantity) {
        if (deal.price_two_for || deal.price_ten_for) {
          const price_two_forDeal = deal.price_two_for;
          const price_ten_forDeal = deal.price_ten_for;

          for (let i = 0; i < quantity; i++) {
            if (price_two_forDeal)
              price_two_forDeals.push(Number(price_two_forDeal));
            if (price_ten_forDeal) state.price_ten_forDeals += 1;
          }

          if (
            price_two_forDeal &&
            price_two_forDeals.filter((val) => val === price_two_forDeal)
              .length > 1
          ) {
            state.cart = checkMultiBuys(state.cart, deal, false, 2);
          } else if (price_ten_forDeal && state.price_ten_forDeals > 9) {
            state.cart = checkMultiBuys(state.cart, deal, false, 10);
          }
        }
      }

      if (promotionCode) {
        checkDiscountCode(state.cart, state.promotionCode);
      }
      storeCart(state.cart);
    },
    decrement: (state, action: PayloadAction<{ id: string; all: boolean }>) => {
      const { id, all } = action.payload;
      const { price_two_forDeals } = state;
      const item = state.cart[id];
      const { quantity, deal } = item;

      if (all || quantity === 1) {
        delete state.cart[id];
      } else {
        state.cart[id].quantity = quantity - 1;
      }

      //  check if existing products in cart still qualify for any multibuys
      if (deal) {
        const { price_two_for, price_ten_for } = deal;
        if (price_two_for || price_ten_for) {
          const qty = all ? quantity : 1;
          if (price_two_for) {
            for (let i = 0; i < qty; i++) {
              const ind = price_two_forDeals.indexOf(price_two_for);
              price_two_forDeals.splice(ind, 1);
            }
          } else {
            state.price_ten_forDeals -= all ? quantity : 1;
          }
          if (
            (price_two_for &&
              price_two_forDeals.filter((val) => val === price_two_for).length <
                2) ||
            (price_ten_for && state.price_ten_forDeals < 10)
          ) {
            state.cart = checkMultiBuys(state.cart, deal, true, 0);
          }
        }
      }
      storeCart(state.cart);
    },
    applyDiscountCode: (state, action: PayloadAction<string>) => {
      state.promotionCode = action.payload;
      checkDiscountCode(state.cart, state.promotionCode);
      storeCart(state.cart);
    },
  },
});

export const { increment, decrement, applyDiscountCode } = cartSlice.actions;

export const selectCart = (state: { cart: CartState }) => state.cart.cart;

export default cartSlice.reducer;
