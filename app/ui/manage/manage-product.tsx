'use client';

import React, { useState } from 'react';
import { useFormState } from 'react-dom';
import SelectWine from '@/app/ui/manage/select-wine';
import SelectLists from '@/app/ui/manage/select-list';
import ManageProductActions from './manage-product-actions';
import ManageDBMessages from './manage-db-messages';
import ModalDelete from './modal-delete';
import { isRequired } from '@/app/lib/appData.json';
import { addProduct, updateProduct, deleteProduct } from '@/app/lib/actions';
import { DataProps, FormStateProps } from '@/app/lib/definitions';
import styles from '@/app/_assets/css/manage/Form.module.css';

type ManageProductProps = {
  product: DataProps;
  action: string;
  ddlWineItems: { [k: string]: string | number };
  ddlItems: { [k: string]: string | number };
};

const initialState: FormStateProps = { message: null, errors: {} };

export default function ManageProduct({
  product,
  action,
  ddlWineItems,
  ddlItems,
}: ManageProductProps) {
  const [showModal, setShowModal] = useState(false);
  const isDelete = action === 'delete';
  const { id, name } = product;
  let currentActionFn: any;

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
  const enableModal = (e: React.MouseEvent<Element, MouseEvent>): void => {
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
              disabled={(key === 'id' && value) || isDelete}
              required={isReq}
            />
          </div>
        );
      })}
      <SelectWine ddlWineItems={ddlWineItems} isDelete={isDelete} />
      <SelectLists obj={ddlItems} isDelete={isDelete} />
      <ManageProductActions isDelete={isDelete} enableModal={enableModal} />
      <ManageDBMessages initialState={state} />
      {showModal && (
        <ModalDelete
          id={id}
          name={name}
          initialState={initialState}
          setShowModal={setShowModal}
        />
      )}
    </form>
  );
}
