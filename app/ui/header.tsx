import Link from 'next/link';
import AutoComplete from '@/app/ui/AutoComplete';
import Nav from './nav';
import Img from './image';
import HeaderUserCart from './header-user-cart';
import { fetchProducts } from '../lib/data';
import { DataProps } from '../lib/definitions';
import getUser from '@/getUser';
import styles from '@/app/assets/css/Header.module.css';

const Header = async () => {
  const products: DataProps[] = await fetchProducts();
  const user = await getUser();

  return (
    <header className={styles.header}>
      <div className={styles.headerRow}>
        <div className={styles.logo}>
          <Link href="/">
            <Img
              imgSrc={'logos/AK.png'}
              imgAlt="AK Fine Wines"
              imgWidth={80}
              imgHeight={80}
              imgPriority={true}
            />
          </Link>
        </div>
        <h1 className={styles.hdr}>
          AK <span>FINE WINES</span>
        </h1>
        <div className={styles.acDesk}>
          <AutoComplete products={products} />
        </div>
        <HeaderUserCart user={user} />
      </div>
      <Nav />
    </header>
  );
};

export default Header;
