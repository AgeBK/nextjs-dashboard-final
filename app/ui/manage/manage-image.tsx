'use client';

import React, { useState } from 'react';
import { ManageImageProps } from '@/app/lib/definitions';
import { validImage } from '@/app/lib/utils';
import ImgFill from '../image-fill';
import ManageUpload from './manage-upload';
import data from '@/app/lib/appData.json';

export default function ManageImage({
  productId,
  packaging,
  productAdded,
  action,
  isDelete,
}: ManageImageProps) {
  console.log(productId, packaging, productAdded, action);
  const [isImageFound, setIsImageFound] = useState(false);
  const { imgWinePath } = data;
  const imgURL = `${imgWinePath}${productId}.jpg`;

  validImage(imgURL).then((isValid) => {
    setIsImageFound(isValid);
  });

  return (
    <div>
      {!isDelete && (
        <ManageUpload productId={productId} productAdded={productAdded} />
      )}
      {productId && isImageFound && (
        <ImgFill
          imgSrc={`wine/${productId}.jpg`}
          imgAlt=""
          imgStyle="product130h"
        />
      )}
    </div>
  );
}
