import { useEffect, useState, useRef, useCallback } from 'react';
import { UseCartStateProps } from '../lib/definitions';

const useCartState = (): UseCartStateProps => {
  // a referece to the outer cart is passed, this hook will manage open/closed state
  // cart can only be opened by clicking on the cart
  // cart can be closed by clicking anywhere in the screen
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);

  const handleOpen = useCallback(
    (e: MouseEvent): void => {
      e.stopPropagation();
      if (!isOpen) setIsOpen(true);
    },
    [isOpen],
  );

  const handleClose = useCallback(() => {
    if (isOpen) setIsOpen(false);
  }, [isOpen]);

  useEffect(() => {
    const elem = ref.current;
    if (!elem) return undefined;

    elem.addEventListener('mousedown', handleOpen);
    document.addEventListener('mousedown', handleClose);

    return () => {
      elem.removeEventListener('mousedown', handleOpen);
      document.removeEventListener('mousedown', handleClose);
    };
  }, [handleOpen, handleClose]);

  return [ref, isOpen, handleClose];
};

export default useCartState;
