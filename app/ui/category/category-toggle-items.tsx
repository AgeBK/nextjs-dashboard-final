import Button from "@/app/ui/button";
import styles from "@/app/_assets/css/CategoryToggleItems.module.css";

type CategoryToggleItemsProps = {
  togglePageItems: () => void;
  isItems: boolean;
};

const CategoryToggleItems = ({
  togglePageItems,
  isItems,
}: CategoryToggleItemsProps) => {
  return (
    <div className={styles.smlScreen}>
      <Button css="filters" onClick={togglePageItems}>
        {isItems ? "X" : "Filters"}
      </Button>
    </div>
  );
};

export default CategoryToggleItems;
