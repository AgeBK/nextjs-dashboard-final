'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { increment } from '@/app/slices/cartSlice';
import { AddToCartProps } from '../lib/definitions';
import Button from './button';
import CartImage from './cart/cart-image';

export default function AddToCart({
  id,
  name,
  brand,
  shortName,
  price,
  quantity,
  deal,
  promotionDiscountCode,
}: AddToCartProps) {
  // add to cart button shared across the site / uses Redux
  const [itemId, setItemId] = useState('');
  const dispatch = useDispatch();
  const isAdded = itemId === id;

  const handleClick = () => {
    setItemId(id);

    dispatch(
      increment({
        id,
        name,
        brand,
        shortName,
        price,
        quantity,
        deal,
        promotionDiscountCode,
      }),
    );
  };

  return (
    <Button css={isAdded ? 'cartAdded' : 'cart'} onClick={handleClick}>
      <CartImage itemAdded={isAdded} />
      <span>{id === itemId ? 'Item Added' : 'Add to cart'}</span>
    </Button>
  );
}
