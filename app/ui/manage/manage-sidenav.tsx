'use client';

import { useState } from 'react';
import Link from 'next/link';
import Img from '../image';
import Button from '../button';
import styles from '@/app/assets/css/manage/ManageSidneNav.module.css';

export default function ManageSideNav() {
  const [isShow, setIsShow] = useState(false);

  return (
    <>
      {isShow ? (
        <div className={styles.sideNav}>
          <Button css="" onClick={() => setIsShow(false)}>
            <span className={styles.close}>X</span>
          </Button>
          <Link href="/manage">
            <h1 className={styles.hdr}>Admin Panel</h1>
            <Img
              imgSrc={`icons/settings.png`}
              imgAlt="Admin Panel"
              imgWidth={128}
              imgHeight={128}
              imgPriority={true}
            />
          </Link>
          <div>
            <ul className={styles.navItems}>
              <li>
                <Link href="/manage/add">Add Product</Link>
              </li>
              <li>
                <Link href="/manage">Sales Data</Link>
              </li>
              <li>
                <Link href="/manage">Reports</Link>
              </li>
              <li>
                <Link href="/">Home</Link>
              </li>
            </ul>
            {/* <Logout /> */}
          </div>
        </div>
      ) : (
        <span
          className={styles.burger}
          onClick={() => setIsShow(!isShow)}
          onKeyDown={() => setIsShow(!isShow)}
          role="button"
          tabIndex={0}
        >
          ☰ Admin Menu
        </span>
      )}
    </>
  );
}
