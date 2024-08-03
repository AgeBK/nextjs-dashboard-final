'use client';

import styles from '@/app/assets/css/manage/Form.module.css';
// TODO: need to validate product id
export const Upload = ({ productId }: { productId: string }) => {
  const fileName = `${productId}.jpg`;
  console.log('Upload: ' + fileName);

  return (
    <div>
      <label htmlFor="upload">
        <span className={styles.key}>Upload image</span>
      </label>
      <input
        id="upload"
        type="file"
        name="file"
        accept="image/*"
        onChange={async ({ target: { files } }) => {
          if (files && files[0].type.includes('image') && productId) {
            console.log(files);
            console.log(files[0]);
            const formData = new FormData();
            formData.append('file', files[0], fileName);

            const response = await fetch('/api/upload', {
              method: 'POST',
              body: formData,
            });

            const result = await response.json();
            console.log(result);

            if (result.success) {
              // alert('Upload ok : ' + result.name);
            } else {
              // alert('Upload failed');
            }
          }
        }}
      />
    </div>
  );
};
