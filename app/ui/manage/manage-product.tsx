'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { addProduct, updateProduct, deleteProduct } from '@/app/lib/actions';
import { FormStateProps, ManageProductProps } from '@/app/lib/definitions';
import SelectWine from '@/app/ui/manage/select-wine';
import SelectLists from '@/app/ui/manage/select-list';
import InputFields from './input-fields';
import ManageProductActions from './manage-product-actions';
import ManageDBMessages from './manage-db-messages';
import ModalDelete from './modal-delete';
import ManageImage from './manage-image';
import styles from '@/app/assets/css/manage/Form.module.css';

// TODO: finish running lint
// TODO: wave / console / terminal all pages
// TODO: update readme
// TODO: http://localhost:3000/red/shiraz/1234567 (if product doesn't exist, should display message)
// TODO: product page 2 for in product cart doesn't auto adjust to special price?
// TODO: manage mobile view

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
  const isDelete = action === 'delete';

  // eslint-disable-next-line
  let currentActionFn: any = null;

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

  // useFormState first arg expects a function that takes 2 arguments (state, formdata)
  // state is the initial state, formData is automatically added
  const [state, dispatch] = useFormState(currentActionFn, initialState);

  useEffect(() => {
    console.log('UE');
    console.log(state);

    if (state.success) {
      window.location.href = '/manage';
    }
  }, [state]);

  // product id used for image name when adding product
  const handleChange = ({
    target: { value, id },
  }: ChangeEvent<HTMLInputElement>) => id === 'id' && setProductId(value);

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
      <ManageImage
        productId={productId || id}
        packaging={ddlItems.packaging as string}
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
  );
}
