'use client';

import React, { useState } from 'react';
import { isRequired } from '@/app/lib/appData.json';
import { addProduct, updateProduct, deleteProduct } from '@/app/lib/actions';
import { DataProps, FormStateProps } from '@/app/lib/definitions';
import SelectWine from '@/app/ui/manage/select-wine';
import SelectLists from '@/app/ui/manage/select-list';
import { useFormState } from 'react-dom';
import ManageProductActions from './manage-product-actions';
import styles from '@/app/_assets/css/manage/Form.module.css';
import ManageDBMessages from './manage-db-messages';
import ModalDelete from './modal-delete';

type ProductProps = {
  product: DataProps;
  action: string;
  ddlWineItems: DataProps;
  ddlItems: DataProps;
};

const initialState: FormStateProps = { message: null, errors: {} };

export default function ManageProduct({
  product,
  action,
  ddlWineItems,
  ddlItems,
}: ProductProps) {
  const [showModal, setShowModal] = useState(false);
  const { id } = product;

  let currentActionFn = null;
  switch (action) {
    case 'add':
      currentActionFn = addProduct;
      break;
    case 'edit':
      currentActionFn = updateProduct.bind(null, id);
      break;
    case 'delete':
      currentActionFn = deleteProduct.bind(null, id);
      break;
    default:
      break;
  }
  const [state, dispatch] = useFormState(currentActionFn, initialState);
  console.log(product);
  // TODO: Got wierd error msg, ratings average with lachlan ridge 9190970
  // TODO: some of the price inputs aren't type number?

  // const checkMin = (key: string) =>
  //   key === 'price_normal' || key === 'price_current' ? 1 : 0;

  const test = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <form action={dispatch} className={styles.container}>
      {Object.entries(product).map(([key, value]: [string, any], i) => {
        const isReq = isRequired.includes(key);
        const dataType = typeof value === 'number' ? 'number' : 'text';
        return (
          <div className={`${styles.item} ${styles[key]}`} key={key}>
            <label htmlFor={key} id={`lbl${key}`}>
              <span className={styles.key}>
                {key.replaceAll('_', ' ')}{' '}
                {isReq && <span className={styles.required}>*</span>}
              </span>
            </label>
            <input
              id={key}
              name={key}
              className={styles.input}
              type={dataType}
              defaultValue={value}
              aria-labelledby={`lbl${key}`}
              disabled={key === 'id' && value}
              required={isReq}
            />
          </div>
        );
      })}
      <SelectWine ddlWineItems={ddlWineItems} />
      <SelectLists obj={ddlItems} />
      <ManageProductActions isDelete={action === 'delete'} test={test} />
      <ManageDBMessages initialState={state} />
      {showModal && (
        <ModalDelete
          id={id}
          name={name}
          initialState={initialState}
          // setShowModal={setShowModal}
        />
      )}
    </form>
  );
}
