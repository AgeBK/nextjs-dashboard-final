import { ButtonProps } from '../lib/definitions';
import styles from '@/app/assets/css/Button.module.css';

export default function Button({ children, css, ...rest }: ButtonProps) {
  // generic button used around the site
  return (
    <button {...rest} className={styles[css]}>
      {children}
    </button>
  );
}
