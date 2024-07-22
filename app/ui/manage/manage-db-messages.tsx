import React from 'react';
import { ManageDBMessagesProps } from '@/app/lib/definitions';
import styles from '@/app/assets/css/manage/Form.module.css';

export default function ManageDBMessages({
  initialState,
}: ManageDBMessagesProps) {
  return (
    <div aria-live="polite" className={styles.error} role="status">
      <div className={styles.message}>{initialState?.message}</div>
      <ul>
        {initialState.errors &&
          Object.entries(initialState.errors).map(([key, val], i) => (
            <li key={i}>
              <b>{key.replaceAll('_', ' ')}</b> - {val?.toString()}
            </li>
          ))}
      </ul>
    </div>
  );
}
