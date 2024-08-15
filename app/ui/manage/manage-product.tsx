'use client';

import React, { ChangeEvent, useState } from 'react';
import { useFormState } from 'react-dom';
import { addProduct, updateProduct, deleteProduct } from '@/app/lib/actions';
import { FormStateProps, ManageProductProps } from '@/app/lib/definitions';
import { hyphenate } from '@/app/lib/utils';
import SelectWine from '@/app/ui/manage/select-wine';
import SelectLists from '@/app/ui/manage/select-list';
import InputFields from './input-fields';
import ManageProductActions from './manage-product-actions';
import ManageDBMessages from './manage-db-messages';
import ModalDelete from './modal-delete';
import ManageImage from './manage-image';
import Link from 'next/link';
import styles from '@/app/assets/css/manage/Form.module.css';

// TODO: capitalise error message
// TODO: edit product, update image check?
// TODO: warning for unused vars?

const initialState: FormStateProps = {
  message: null,
  errors: {},
  success: false,
};

export default function ManageProduct({
  product,
  action,
  ddlWineItems,
  ddlItems,
}: ManageProductProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [productId, setProductId] = useState<string>('');
  const { id, name } = product;
  const { category, variety } = ddlWineItems;
  const isDelete = action === 'delete';
  const isAdd = action === 'add';
  let currentActionFn: any = null;

  console.log('ManageProduct');
  console.log(product);

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

  const handleChange = ({
    target: { value, id },
  }: ChangeEvent<HTMLInputElement>) => id === 'id' && setProductId(value);

  const enableModal = (e: React.MouseEvent<Element, MouseEvent>): void => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <>
      {!isAdd && (
        // TODO: component?
        <Link
          href={`/${String(category).toLowerCase()}/${hyphenate(
            String(variety).toLowerCase(),
          )}/${id}`}
          target="_blank"
        >
          View product
        </Link>
      )}
      <form action={dispatch} className={styles.container}>
        <InputFields
          product={product}
          isDelete={isDelete}
          handleChange={handleChange}
        />
        <SelectWine ddlWineItems={ddlWineItems} isDelete={isDelete} />
        <SelectLists ddlWineItems={ddlItems} isDelete={isDelete} />
        <ManageImage
          productId={productId || id}
          packaging={ddlItems.packaging as string}
          productAdded={state.success}
          action={action}
          isDelete={isDelete}
        />
        <ManageProductActions isDelete={isDelete} enableModal={enableModal} />
        <ManageDBMessages errorMessages={state} />
        {showModal && (
          <ModalDelete
            id={id}
            name={name}
            initialState={initialState}
            setShowModal={setShowModal}
          />
        )}
      </form>
    </>
  );
}
