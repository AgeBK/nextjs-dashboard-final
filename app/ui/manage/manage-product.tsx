'use client';

import React, { ChangeEvent, useState } from 'react';
import { useFormState } from 'react-dom';
import { addProduct, updateProduct, deleteProduct } from '@/app/lib/actions';
import { FormStateProps, ManageProductProps } from '@/app/lib/definitions';
import SelectWine from '@/app/ui/manage/select-wine';
import SelectLists from '@/app/ui/manage/select-list';
import InputFields from './input-fields';
import ManageProductActions from './manage-product-actions';
import ManageDBMessages from './manage-db-messages';
import ModalDelete from './modal-delete';
import { Upload } from './upload';
import styles from '@/app/assets/css/manage/Form.module.css';

const initialState: FormStateProps = { message: null, errors: {} };

export default function ManageProduct({
  product,
  action,
  ddlWineItems,
  ddlItems,
}: ManageProductProps) {
  const [showModal, setShowModal] = useState(false);
  const [productId, setProductId] = useState('');
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // TODO: got variations of onChange, which is correct?
    // {target: {valu, id}}  ??
    const { value, id } = e.target;
    id === 'id' && setProductId(value);
  };

  const [state, dispatch] = useFormState(currentActionFn, initialState);
  const enableModal = (e: React.MouseEvent<Element, MouseEvent>): void => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <form action={dispatch} className={styles.container}>
      <InputFields
        product={product}
        isDelete={isDelete}
        handleChange={handleChange}
      />
      <SelectWine ddlWineItems={ddlWineItems} isDelete={isDelete} />
      <SelectLists ddlWineItems={ddlItems} isDelete={isDelete} />
      {action === 'add' && <Upload productId={productId} />}
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
