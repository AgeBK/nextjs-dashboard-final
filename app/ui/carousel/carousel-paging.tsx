import data from '@/app/lib/appData.json';
import Button from '@/app/ui/button';
import { CarouselPagingProps } from '@/app/lib/definitions';
import styles from '@/app/assets/css/carousel/CarouselPaging.module.css';

export default function CarouselPaging({
  items,
  pageIndex,
  setPageIndex,
  handleClick,
}: CarouselPagingProps) {
  if (items) {
    // items is the number of carousel items to display based on width of screen
    const { MAX_CAROUSEL_PRODUCTS } = data; // 12
    const html: Array<JSX.Element> = [];
    const totalPages = Math.ceil(MAX_CAROUSEL_PRODUCTS / items);
    for (let i = 0; i < totalPages; i++) {
      const id: string = `CarouselPaging${i}`;
      html.push(
        <span key={id}>
          <label htmlFor={id}>{`page ${i + 1}`}</label>
          <input
            type="radio"
            name="carouselPaging"
            id={id}
            value={i}
            onChange={(e) => setPageIndex(Number(e.target.value))}
            checked={i === pageIndex}
          />
        </span>,
      );
    }
    return (
      <div className={styles.carouselPaging}>
        <Button
          css="pageNumber"
          onClick={() => handleClick(-1)}
          disabled={pageIndex <= 0}
        >
          &lt;
        </Button>
        <span role="radiogroup">{html}</span>
        <Button
          css="pageNumber"
          onClick={() => handleClick(1)}
          disabled={pageIndex + 1 >= totalPages}
        >
          &gt;
        </Button>
      </div>
    );
  }
  return null;
}
