'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { increment } from '@/app/slices/cartSlice';
import Button from './button';
import { AddToCartProps } from '../lib/definitions';
import CartImage from './cart/cart-image';

const AddToCart = ({
  id,
  name,
  brand,
  short_name,
  price,
  quantity,
  deal,
  promotion_discount_code,
}: AddToCartProps) => {
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
        short_name,
        price,
        quantity,
        deal,
        promotion_discount_code,
      }),
    );
  };

  return (
    <Button css={isAdded ? 'cartAdded' : 'cart'} onClick={handleClick}>
      <CartImage itemAdded={isAdded} />
      <span>{id === itemId ? 'Item Added' : 'Add to cart'}</span>
    </Button>
  );
};

export default AddToCart;
