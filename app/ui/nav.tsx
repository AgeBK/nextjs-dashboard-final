import Link from 'next/link';
import { categoryArr } from '@/app/lib/appData.json';
import styles from '@/app/assets/css/Nav.module.css';

function Nav() {
  return (
    <nav>
      <ul className={styles.nav}>
        {categoryArr.map((val) => {
          const valLC = val.toLowerCase();
          const link = `/${valLC}`;
          return (
            <li className={styles.navItem} key={val}>
              <Link href={link}>
                <div className={styles[valLC]}></div>
                <span>
                  {val} <br />
                  Wine
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Nav;
