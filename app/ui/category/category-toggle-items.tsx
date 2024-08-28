import { CategoryToggleItemsProps } from '@/app/lib/definitions';
import Button from '@/app/ui/button';
import styles from '@/app/assets/css/category/CategoryToggleItems.module.css';

export default function CategoryToggleItems({
  togglePageItems,
  isSmallScreenShowItems,
}: CategoryToggleItemsProps) {
  return (
    <div className={styles.smlScreen}>
      <Button css="filters" onClick={togglePageItems}>
        {isSmallScreenShowItems ? 'X' : 'Filters'}
      </Button>
    </div>
  );
}
