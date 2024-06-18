'use client';

import React, { useState } from 'react';
import { useFormState } from 'react-dom';
import { deleteProduct } from '@/app/lib/actions';
import ExclamationCircle from '@/app/svg/exclamation-circle';
import { Button } from '../button';
import Img from '../image';
import styles from '@/app/_assets/css/manage/ModalDelete.module.css';
import { useRouter } from 'next/navigation';

// const initialState = {
//   message: '',
// };

export default function ModalDelete({
  id,
  name,
  initialState,
  setShowModal,
  setDeleteResult,
}) {
  const [state, dispatch] = useFormState(deleteProduct, id, initialState);
  const router = useRouter();

  console.log(state);

  const handleClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    setShowModal(false);
  };

  const test = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    // alert('test');

    // setShowModal(false);

    dispatch();

    // setDeleteResult(state.message);
    // console.log(state?.message);
  };

  return (
    <div className={styles.modalCont}>
      <p aria-live="polite" className={styles.error} role="status">
        {state?.message}
      </p>
      <form className={styles.modal}>
        <div className={styles.exclamation}>
          <ExclamationCircle css="exclamation" />
        </div>
        <h3 className={styles.hdr}>Are you sure?</h3>
        <div className={styles.confirm}>
          This will permanently delete the following product
          <div className={styles.details}>
            <div>
              <b>Name:</b>
              <br />
              {name}
            </div>
            <div>
              <b>Id:</b>
              <br />
              {id}
            </div>
          </div>
          <Button css="modal" onClick={handleClick}>
            <span className="cancel">Cancel</span>
            <Img
              imageSrc={`icons/xCircle.svg`}
              imageStyle="modal"
              imageAlt="cancel"
              imageWidth={16}
              imageHeight={16}
            />
          </Button>
          <Button css="modal" onClick={test}>
            <span>Delete</span>
            <Img
              imageSrc={`icons/trash.svg`}
              imageStyle="modal"
              imageAlt="delete"
              imageWidth={16}
              imageHeight={16}
            />
          </Button>
        </div>
      </form>
    </div>
  );
}
