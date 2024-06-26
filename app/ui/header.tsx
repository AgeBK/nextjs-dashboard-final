import Link from 'next/link';
import AutoComplete from '@/app/ui/AutoComplete';
import Nav from './nav';
import Img from './image';
import HeaderUserCart from './header-user-cart';
import { fetchProducts } from '../lib/data';
import { DataProps } from '../lib/definitions';
import { auth } from '../../auth';
import styles from '@/app/_assets/css/Header.module.css';

const Header = async () => {
  let products: DataProps[] = await fetchProducts();
  const session = await auth();
  const name = session?.user?.name || null;

  // TODO: remove when finished
  if (session?.user) {
    console.log(session);

    // TODO: Look into https://react.dev/reference/react/experimental_taintObjectReference
    // filter out sensitive data before passing to client.
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    };
  } else {
    console.log('NO SESSION');
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerRow}>
        <div className={styles.logo}>
          <Link href="/">
            <Img
              imageSrc={'logos/AK.png'}
              imageAlt="AK Fine Wines"
              imageWidth={80}
              imageHeight={80}
            />
          </Link>
        </div>
        <h1 className={styles.hdr}>
          AK <span>FINE WINES</span>
        </h1>
        <AutoComplete products={products} />
        <HeaderUserCart name={name} />
      </div>
      <Nav />
    </header>
  );
};

export default Header;
