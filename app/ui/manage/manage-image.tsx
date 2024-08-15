'use client';

import React, { useState } from 'react';
import Img from '../image';
import ManageUpload from './manage-upload';
import data from '@/app/lib/appData.json';
import { ManageImageProps } from '@/app/lib/definitions';
import { validImage } from '@/app/lib/utils';
// import styles from '@/app/assets/css/manage/Form.module.css';
export default function ManageImage({
  productId,
  packaging,
  productAdded,
  action,
  isDelete,
}: ManageImageProps) {
  console.log(productId, packaging, productAdded, action);
  // const isAdd = action === 'add';
  const [isImageFound, setIsImageFound] = useState(false);
  const { imgWinePath } = data;
  const imgURL = `${imgWinePath}${productId}.jpg`;


  validImage(imgURL).then((isValid) => {
    console.log('validImage: ' + isValid);
    setIsImageFound(isValid);
  });

  return (
    <div>
      {!isDelete && (
        <ManageUpload productId={productId} productAdded={productAdded} />
      )}
      {productId && isImageFound && (
        <Img
          imgSrc={`wine/${productId}.jpg`}
          imgAlt="wine"
          imgWidth={packaging === 'Cask' ? 100 : 40}
          imgHeight={150}
        />
      )}
      {/* <img src={`http://localhost:3000/assets/img/wine/${productId}.jpg`} alt="wine" /> */}
    </div>
  );
}
