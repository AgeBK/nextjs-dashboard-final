import React from 'react';
import { ManageDBMessagesProps } from '@/app/lib/definitions';
import { deCamelise } from '@/app/lib/utils';
import styles from '@/app/assets/css/manage/Form.module.css';

// displays database errors add/edit/delete
export default function ManageDBMessages({
  errorMessages,
}: ManageDBMessagesProps) {
  return (
    <div aria-live="polite" className={styles.error} role="status">
      <div className={styles.message}>{errorMessages?.message}</div>
      <ul>
        {errorMessages.errors &&
          Object.entries(errorMessages.errors).map(([key, val], i) => (
            <li key={i} className={styles.messageList}>
              <b>{deCamelise(key)}</b> - {val?.toString()}
            </li>
          ))}
      </ul>
    </div>
  );
}
