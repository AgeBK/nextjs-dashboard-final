import React from 'react';
import { ManageDBMessagesProps } from '@/app/lib/definitions';
import styles from '@/app/assets/css/manage/Form.module.css';

export default function ManageDBMessages({
  errorMessages,
}: ManageDBMessagesProps) {
  return (
    <div aria-live="polite" className={styles.error} role="status">
      <div className={styles.message}>{errorMessages?.message}</div>
      <ul>
        {errorMessages.errors &&
          Object.entries(errorMessages.errors).map(([key, val], i) => (
            <li key={i}>
              <b>{key.replaceAll('_', ' ')}</b> - {val?.toString()}
            </li>
          ))}
      </ul>
    </div>
  );
}
