import data from '@/app/lib/appData.json';
import { Button } from '@/app/ui/button';
import styles from '@/app/_assets/css/carousel/CarouselPaging.module.css';

type CarouselPagingProps = {
  items: number;
  pageIndex: number;
  setPageIndex: (prev: number) => void;
  handleClick: (prev: number) => void;
};

const CarouselPaging = ({
  items,
  pageIndex,
  setPageIndex,
  handleClick,
}: CarouselPagingProps) => {
  if (items) {
    const { MAX_CAROUSEL_PRODUCTS } = data;
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
        {html}
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
};

export default CarouselPaging;
