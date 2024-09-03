import Link from 'next/link';
import data from '@/app/lib/appData.json';
import styles from '@/app/assets/css/PriceDrop.module.css';

const PriceDrop = ({
  promotionCalloutText,
}: {
  promotionCalloutText: string | undefined;
}) => {
  // if item has a deal or is on special
  // a link to that category is displayed in product item component
  const { numberToWord } = data;
  const numToWord: { [key: number]: string } = numberToWord;
  let arr: string[] = [];
  let amount = '';
  let price = 0;
  let isTenPercent = false;
  let priceDropLink: JSX.Element | null = null;

  if (promotionCalloutText) {
    if (promotionCalloutText.includes('for')) {
      // 2 for and 10 for deals
      arr = promotionCalloutText.split(' ');
      amount = numToWord[Number(arr[0])];
      price = parseInt(arr[2].replace('$', ''), 10);
    } else if (promotionCalloutText.startsWith('10%')) {
      isTenPercent = true;
    }
  }

  if (arr.length > 0) {
    priceDropLink = (
      <Link
        href={`/${amount}-for-${price}`}
        className={`${styles.sale} ${styles.priceTwoFor}`}
      >
        <>
          <span className={`${styles.priceDrop}`}>
            {arr.map((val) => (
              <div className={styles.info} key={val}>
                {val}
              </div>
            ))}
          </span>
          <span className={styles.seeAll}>
            See
            <br />
            All
          </span>
        </>
      </Link>
    );
  } else if (isTenPercent) {
    priceDropLink = (
      <div className={styles.special}>
        <Link href="/ten-percent-off">{promotionCalloutText} </Link>
      </div>
    );
  } else {
    priceDropLink = (
      <Link href="/price-drop" className={styles.sale}>
        <>
          <span className={styles.priceDrop}>
            PRICE <br /> DROP
          </span>
          <span className={styles.seeAll}>
            See
            <br />
            All
          </span>
        </>
      </Link>
    );
  }

  return priceDropLink;
};

export default PriceDrop;
