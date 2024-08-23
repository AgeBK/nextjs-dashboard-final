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
    const { files } = event.target;
    if (files) {
      const validImg = files[0].type === 'image/jpeg';

      if (productId && validImg) {
        const isSuccess = await uploadImg(files[0], productId);

        setIsNewImage(isSuccess);
      } else {
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
