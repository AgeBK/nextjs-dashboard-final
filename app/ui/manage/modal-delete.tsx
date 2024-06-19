'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '../button';
import Img from '../image';
import ExclamationCircle from '@/app/svg/exclamation-circle';
import styles from '@/app/_assets/css/manage/ModalDelete.module.css';

type ModalDeleteProps = {
  id: string;
  name: string;
  initialState: any;
  setShowModal: (show: boolean) => void;
};

export default function ModalDelete({
  id,
  name,
  initialState,
  setShowModal,
}: ModalDeleteProps) {
  const handleClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    setShowModal(false);
  };

  return (
    <div className={styles.modalCont}>
      {/* <p aria-live="polite" className={styles.error} role="status">
        {state?.message}
      </p> */}
      <div className={styles.modal}>
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
          <div className={styles.actions}>
            <Link href="/manage" className={styles.cancel}>
              <span>Cancel </span>
              <Img
                imageSrc={`icons/xCircle.svg`}
                imageStyle=""
                imageAlt="cancel"
                imageWidth={24}
                imageHeight={24}
              />
            </Link>
            <Button css="delete" type="submit">
              <span>Delete </span>
              <Img
                imageSrc={`icons/trash.svg`}
                imageStyle="" // TODO:
                imageAlt="save"
                imageWidth={24}
                imageHeight={24}
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
