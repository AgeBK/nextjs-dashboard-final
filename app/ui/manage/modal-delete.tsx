'use client';

import React from 'react';
import Link from 'next/link';
import Button from '../button';
import Img from '../image';
import ExclamationCircle from '@/app/svg/exclamation-circle';
import styles from '@/app/assets/css/manage/ModalDelete.module.css';

type ModalDeleteProps = {
  id: string;
  name: string;
  initialState: any;
  setShowModal: (show: boolean) => void;
};

export default function ModalDelete({ id, name }: ModalDeleteProps) {
  return (
    <div className={styles.modalCont}>
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
                imgSrc={`icons/xCircle.svg`}
                imgAlt="cancel"
                imgWidth={24}
                imgHeight={24}
              />
            </Link>
            <Button css="delete" type="submit">
              <span>Delete </span>
              <Img
                imgSrc={`icons/trash.svg`}
                imgAlt="save"
                imgWidth={24}
                imgHeight={24}
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
