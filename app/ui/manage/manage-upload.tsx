'use client';

import React, { ChangeEvent, useRef } from 'react';
import { UploadProps } from '@/app/lib/definitions';
import styles from '@/app/assets/css/manage/Form.module.css';

export default function ManageUpload({ productId, productAdded }: UploadProps) {
  const elemRef = useRef<Blob>();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('ManageUpload - onChange:' + productId);
    const { files } = event.target;
    if (files) {
      const validImg = files[0].type === 'image/jpeg';

      if (productId && validImg) {
        console.log('ManageUpload - onChange good');
        elemRef.current = files[0];
      } else {
        console.log('ManageUpload - onChange Error');
        console.log(productId, validImg);
      }
    }
  };

  const uploadImg = async () => {
    const elem = elemRef.current;
    if (elem) {
      console.log(elem);
      const fileName: string = `${productId}.jpg`;
      const formData = new FormData();
      formData.append('file', elem, fileName);

      console.log('ManageUpload uploadImg - elem');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log(result);

      if (result.success) {
        console.log('ManageUpload image uploaded SUCCESS');

        window.location.href = '/manage';
        alert('Upload ok : ' + result.name);
      } else {
        console.log('ManageUpload image uploaded FAILED');

        // alert('Upload failed');
      }
    }
  };

  if (productAdded && productId && elemRef.current) {
    console.log('Upload Img valid');
    uploadImg();
  }

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
      />
    </div>
  );
}
