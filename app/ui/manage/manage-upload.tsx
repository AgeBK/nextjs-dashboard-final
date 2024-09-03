'use client';

import React, { ChangeEvent } from 'react';
import { ManageUploadProps } from '@/app/lib/definitions';
import { uploadImg } from '@/app/lib/utils';
import styles from '@/app/assets/css/manage/Form.module.css';

export default function ManageUpload({
  productId,
  setIsNewImage,
  isDelete,
}: ManageUploadProps) {
  const onChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (productId) {
      const { files } = event.target;

      if (files) {
        const file = files[0];
        const validImg = file.type === 'image/webp';

        if (validImg) {
          const isSuccess = await uploadImg(file, productId);
          setIsNewImage(isSuccess);
        } else {
          console.log('ManageUpload error: Invalid image: ', file.type);
        }
      }
    } else {
      console.log('ManageUpload error: Invalid id: ', productId);
    }
  };

  return (
    <div>
      {productId && (
        <>
          <label htmlFor="upload">
            <span className={styles.key}>
              Upload image
              <div className={styles.webp}>(.webp format only)</div>
            </span>
          </label>
          <input
            id="upload"
            type="file"
            name="file"
            accept="image/webp"
            onChange={onChange}
            disabled={isDelete}
          />
        </>
      )}
    </div>
  );
}
