import React from 'react';
import Link from 'next/link';
import Button from '../button';
import Img from '../image';
import { ManageProductActionsProps } from '@/app/lib/definitions';
import styles from '@/app/assets/css/manage/ManageProductActions.module.css';

// add/edit/delte buttons on main manage page
export default function ManageProductActions({
  enableModal,
  isDelete,
}: ManageProductActionsProps) {
  return (
    <div className={styles.container}>
      <Link href="/manage" className={styles.cancel}>
        <span>Cancel </span>
        <Img
          imgSrc={`icons/xCircle.svg`}
          imgAlt="cancel"
          imgWidth={24}
          imgHeight={24}
        />
      </Link>
      {isDelete ? (
        <Button css="delete" onClick={enableModal}>
          <span>Delete </span>
          <Img
            imgSrc={`icons/trash.svg`}
            imgAlt="save"
            imgWidth={24}
            imgHeight={24}
          />
        </Button>
      ) : (
        <Button css="save" type="submit">
          <span>Save </span>
          <Img
            imgSrc={`icons/save.svg`}
            imgAlt="save"
            imgWidth={24}
            imgHeight={24}
          />
        </Button>
      )}
    </div>
  );
}
