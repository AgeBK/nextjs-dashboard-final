'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { increment } from '@/app/slices/cartSlice';
import { Button } from './button';
import { AddToCartProps } from '../lib/definitions';
import CartImage from './cart/cart-image';

const AddToCart = ({
  id,
  name,
  brand,
  shortName,
  price,
  quantity,
  deal,
  discountCode,
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
        shortName,
        price,
        quantity,
        deal,
        discountCode,
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
