import styles from '@/app/_assets/css/Button.module.css';

type ButtonProps = {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<Element, MouseEvent>) => void;
  css: string;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button' | undefined;
};

// TODO: make sure disabled is working correct, paging etc
// TODO: should this be default function (curleys issue, i've changed in a lot of places because of the tutorial button i copied)
export function Button({ children, css, ...rest }: ButtonProps) {
  return (
    <button {...rest} className={styles[css]}>
      {children}
    </button>
  );
}
