import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { checkDiscountCode, checkMultiBuys, storeCart } from './cartUtils';
import { AddToCartProps, CartProps, CartState } from '../lib/definitions';

const initialState: CartState = {
  cart: {},
  priceTwoForDeals: [],
  priceTenForDeals: 0,
  promotionCode: '',
};

// Redux methods to keep track of the users cart
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<AddToCartProps>) => {
      const {
        id,
        name,
        brand,
        shortName,
        price,
        quantity,
        deal,
        promotionDiscountCode,
      } = action.payload;

      const { cart, priceTwoForDeals, promotionCode } = state;

      if (cart[id]) {
        state.cart[id].quantity += quantity;
      } else {
        state.cart[id] = {
          name,
          brand,
          shortName,
          price,
          quantity,
          deal,
          promotionDiscountCode,
        };
      }

      // monitor products in multibuy deals
      if (deal && quantity) {
        if (deal.priceTwoFor || deal.priceTenFor) {
          const priceTwoForDeal = deal.priceTwoFor;
          const priceTenForDeal = deal.priceTenFor;

          for (let i = 0; i < quantity; i++) {
            if (priceTwoForDeal) priceTwoForDeals.push(Number(priceTwoForDeal));
            if (priceTenForDeal) state.priceTenForDeals += 1;
          }

          if (
            priceTwoForDeal &&
            priceTwoForDeals.filter((val) => val === priceTwoForDeal).length > 1
          ) {
            state.cart = checkMultiBuys(state.cart, deal, false, 2);
          } else if (priceTenForDeal && state.priceTenForDeals > 9) {
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
      const { priceTwoForDeals } = state;
      const item = state.cart[id];
      const { quantity, deal } = item;

      if (all || quantity === 1) {
        delete state.cart[id];
      } else {
        state.cart[id].quantity = quantity - 1;
      }

      //  check if existing products in cart still qualify for any multibuys
      if (deal) {
        const { priceTwoFor, priceTenFor } = deal;
        if (priceTwoFor || priceTenFor) {
          const qty = all ? quantity : 1;
          if (priceTwoFor) {
            for (let i = 0; i < qty; i++) {
              const ind = priceTwoForDeals.indexOf(priceTwoFor);
              priceTwoForDeals.splice(ind, 1);
            }
          } else {
            state.priceTenForDeals -= all ? quantity : 1;
          }
          if (
            (priceTwoFor &&
              priceTwoForDeals.filter((val) => val === priceTwoFor).length <
                2) ||
            (priceTenFor && state.priceTenForDeals < 10)
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
    restoreCart: (state, action: PayloadAction<CartProps>) => {
      state.cart = action.payload;
    },
  },
});

export const { increment, decrement, applyDiscountCode, restoreCart } =
  cartSlice.actions;

export const selectCart = (state: { cart: CartState }) => state.cart.cart;

export default cartSlice.reducer;
