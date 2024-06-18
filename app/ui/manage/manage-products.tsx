'use client';

import { useState } from 'react';
import Link from 'next/link';
import { hyphenate } from '@/app/lib/utils';
import Img from '@/app/ui/image';
import ModalDelete from './modal-delete';
import { Button } from '../button';
import styles from '@/app/_assets/css/manage/ManageProducts.module.css';

type ManageProductsProps = {
  props: {
    id: string;
    category: string;
    variety: string;
    name: string;
    short_name: string;
    brand: string;
    packaging: string;
    ratings_average: number;
    price_current: number;
    price_normal: number;
    price_two_for?: number;
    price_percent_off?: number;
    price_ten_for?: number;
    promotion_callout_text?: string;
    promotion_discount_code?: string;
  };
  css?: string; // TODO:
};

const initialState = {
  id: '',
  message: '',
};

export default function ManageProducts({ props, css }: ManageProductsProps) {
  const [showModal, setShowModal] = useState(false);
  const [deleteResult, setDeleteResult] = useState('');

  const {
    id,
    category,
    variety,
    name,
    brand,
    ratings_average,
    price_normal,
    price_current,
  } = props;

  const handleDelete = (id: string, name: string) => {
    setShowModal(true);
    console.log(id, name);
  };

  return (
    <>
      <div key={id} className={styles.row}>
        <div className={styles.col}>{id}</div>
        <div className={styles.col}>{name}</div>
        {/* <div className={`${styles.col} ${styles.name}`}>{name}</div> */}
        <div className={styles.col}>{brand}</div>
        <div className={styles.col}>{category}</div>
        <div className={styles.col}>{variety}</div>
        <div className={`${styles.col} ${styles.price}`}>
          {price_normal} / <span> {price_current}</span>
        </div>
        <div className={`${styles.col} ${styles.actions}`}>
          <Link
            href={`/${category.toLowerCase()}/${hyphenate(
              variety.toLowerCase(),
            )}/${id}`}
          >
            <Img
              imageSrc={`icons/eye.svg`}
              imageStyle=""
              imageAlt="view"
              imageWidth={24}
              imageHeight={24}
            />
          </Link>
          <Link href={`/manage/edit/${id}`}>
            <Img
              imageSrc={`icons/pencil.svg`}
              imageStyle=""
              imageAlt="edit"
              imageWidth={24}
              imageHeight={24}
            />
          </Link>
          <Link href={`/manage/delete/${id}`}>
            <Img
              imageSrc={`icons/trash.svg`}
              imageStyle=""
              imageAlt="edit"
              imageWidth={24}
              imageHeight={24}
            />
          </Link>
          {/* // TODO: test delete on this 9138878 */}
          {/* <Button css="" onClick={deleteProduct}></Button> */}
          <>
            <Button css="" onClick={() => handleDelete(id, name)}>
              <Img
                imageSrc={`icons/trash.svg`}
                imageStyle=""
                imageAlt="delete"
                imageWidth={24}
                imageHeight={24}
              />
            </Button>
            {showModal && (
              <ModalDelete
                id={id}
                name={name}
                initialState={initialState}
                setShowModal={setShowModal}
                setDeleteResult={setDeleteResult}
              />
            )}
          </>
        </div>
      </div>
    </>
  );
}

// const Modal = ({ id, name }: { id: string; name: string }) => (
//   <div className={styles.modalCont}>
//     <form action={dispatch} className={styles.modal}>
//       <ExclamationCircle css="exclamation" />
//       <h3 className={styles.hdr}>Are you sure?</h3>
//       <div className={styles.confirm}>
//         This will permanently delete the following product
//         <p>
//           <div>
//             <b>Name:</b> {name}
//           </div>
//           <div>
//             <b>Id:</b> {id}
//           </div>
//         </p>
//         <Button css="modal" onClick={() => setShowModal(false)}>
//           <span className="cancel">Cancel</span>
//           <Img
//             imageSrc={`icons/xCircle.svg`}
//             imageStyle="modal"
//             imageAlt="cancel"
//             imageWidth={16}
//             imageHeight={16}
//           />
//         </Button>
//         <Button css="modal" type="submit">
//           <span>Delete</span>
//           <Img
//             imageSrc={`icons/trash.svg`}
//             imageStyle="modal"
//             imageAlt="delete"
//             imageWidth={16}
//             imageHeight={16}
//           />
//         </Button>
//       </div>
//     </form>
//   </div>
// );
