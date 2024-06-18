import Link from 'next/link';
import AutoComplete from '@/app/ui/AutoComplete';
import Nav from './nav';
import Img from './image';
import Cart from './cart/cart';
import { fetchProducts } from '../lib/data';
import { DataProps } from '../lib/definitions';
// import { user } from "@heroicons/react/outline";
// import { UserCircleIcon } from '@heroicons/react/24/outline';
// import { UserCircleIcon } from "@heroicons/react/24/solid";
import LoginLink from './login-link';

import styles from '@/app/_assets/css/Header.module.css';
import { signOut } from '@/auth';
import { auth } from '../../auth';

const Header = async () => {
  let products: DataProps[] = await fetchProducts();
  const session = await auth();
  // console.log("HEADER ZZZ");

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

  const test = session?.user?.name;

  return (
    <header className={styles.header}>
      <div className={styles.headerRow}>
        <div className={styles.logo}>
          <Link href="/">
            <Img
              imageSrc={'logos/AK.png'}
              imageStyle="logo"
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
        <div className={styles.userCont}>
          {test ? (
            <div className={styles.userName}>
              {session?.user?.name?.substring(0, 1)}
            </div>
          ) : (
            <div className={styles.userContainer}>
              {/* <Link href="/login">
                <UserCircleIcon className={styles.user} />
              </Link> */}
              <LoginLink />
            </div>
          )}
          <div className={styles.cartCont}>
            <Cart />
          </div>
        </div>
      </div>
      <Nav />
    </header>
  );
};

export default Header;
