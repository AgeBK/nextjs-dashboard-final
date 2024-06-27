import React from 'react';
import Button from '../button';
import Link from 'next/link';
import Img from '../image';
import styles from '@/app/_assets/css/manage/ManageProductActions.module.css';

type ManageProductActionsProps = {
  isDelete: boolean;
  enableModal: (e: React.MouseEvent<Element, MouseEvent>) => void;
};

const ManageProductActions = ({
  isDelete,
  enableModal,
}: ManageProductActionsProps) => {
  return (
    <>
      <Link href="/manage" className={styles.cancel}>
        <span>Cancel </span>
        <Img
          imgSrc={`icons/xCircle.svg`}
          imageStyle="campaignMii"
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
            imageStyle="campaignMii" // TODO:
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
            imageStyle="campaignMii"
            imgAlt="save"
            imgWidth={24}
            imgHeight={24}
          />
        </Button>
      )}
    </>
  );
};

export default ManageProductActions;
