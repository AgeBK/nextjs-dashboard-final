import { ButtonProps } from '../lib/definitions';
import styles from '@/app/_assets/css/Button.module.css';

export default function Button({ children, css, ...rest }: ButtonProps) {
  return (
    <button {...rest} className={styles[css]}>
      {children}
    </button>
  );
}
