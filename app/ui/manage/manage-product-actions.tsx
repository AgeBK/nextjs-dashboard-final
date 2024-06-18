import React from 'react';
import { Button } from '@/app/ui/button';
import Link from 'next/link';
import Img from '../image';
import styles from '@/app/_assets/css/manage/ManageProductActions.module.css';

const ManageProductActions = ({
  isDelete,
  test,
}: {
  isDelete: boolean;
  setShowModal: () => void;
}) => {
  return (
    <>
      {isDelete ? (
        <Button css="delete" onClick={test}>
          <span>Delete </span>
          <Img
            imageSrc={`icons/trash.svg`}
            imageStyle="campaignMii" // TODO:
            imageAlt="save"
            imageWidth={24}
            imageHeight={24}
          />
        </Button>
      ) : (
        <Button css="save" type="submit">
          <span>Save </span>
          <Img
            imageSrc={`icons/save.svg`}
            imageStyle="campaignMii"
            imageAlt="save"
            imageWidth={24}
            imageHeight={24}
          />
        </Button>
      )}

      <Link href="/manage" className={styles.cancel}>
        <span>Cancel </span>
        <Img
          imageSrc={`icons/xCircle.svg`}
          imageStyle="campaignMii"
          imageAlt="cancel"
          imageWidth={24}
          imageHeight={24}
        />
      </Link>
    </>
  );
};

export default ManageProductActions;
