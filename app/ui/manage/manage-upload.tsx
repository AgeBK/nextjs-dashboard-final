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
    console.log('ManageUpload - onChange:' + productId);
    const { files } = event.target;
    if (files) {
      const validImg = files[0].type === 'image/jpeg';

      if (productId && validImg) {
        console.log('ManageUpload - onChange good');
        const isSuccess = await uploadImg(files[0], productId);
        console.log('isSuccess: ' + isSuccess);

        setIsNewImage(isSuccess);
      } else {
        console.log('ManageUpload - onChange Error');
        console.log(productId, validImg);
      }
    }
  };

  return (
    <div>
      <label htmlFor="upload">
        <span className={styles.key}>
          Upload image <div className={styles.jpg}>(.jpg format only)</div>
        </span>
      </label>
      <input
        id="upload"
        type="file"
        name="file"
        accept="image/jpeg"
        onChange={onChange}
        disabled={isDelete}
      />
    </div>
  );
}
