import React from 'react';
import { FormStateProps } from '@/app/lib/definitions';
import styles from '@/app/assets/css/manage/Form.module.css';

type initialStateProps = {
  initialState: FormStateProps;
};

export default function ManageDBMessages({ initialState }: initialStateProps) {
  console.log('ManageDBMessages');
  console.log(initialState);

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
