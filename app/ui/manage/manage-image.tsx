'use client';

import React, { useState } from 'react';
import { ManageImageProps } from '@/app/lib/definitions';
import { validImage } from '@/app/lib/utils';
import ImgFill from '../image-fill';
import ManageUpload from './manage-upload';
import data from '@/app/lib/appData.json';
import styles from '@/app/assets/css/manage/Form.module.css';

export default function ManageImage({
  productId,
  packaging,
  action,
  isDelete,
}: ManageImageProps) {
  console.log(productId, packaging, action);
  const [isImageFound, setIsImageFound] = useState(false);
  const [isNewImage, setIsNewImage] = useState(false);
  const { imgWinePath } = data;
  const imgURL = `${imgWinePath}${productId}.jpg`;

  validImage(imgURL).then((isValid) => {
    setIsImageFound(isValid);
  });

  return (
    <div>
      <ManageUpload
        productId={productId}
        setIsNewImage={setIsNewImage}
        isDelete={isDelete}
      />
      {productId && isImageFound && !isNewImage && (
        <div>
          <ImgFill
            imgSrc={`wine/${productId}.jpg`}
            imgAlt=""
            imgStyle="product130h"
            imgPriority={true}
          />
        </div>
      )}
      {/* Next.js image caching stops new uploaded images being shown so using standard img element */}
      {productId && isNewImage && (
        <div className={styles.newImage}>
          <img
            src={`/assets/img/wine/${productId}.jpg`}
            alt="wine"
            className={styles.uploadImg}
          />
        </div>
      )}
    </div>
  );
}
