import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/lib/actions';
import Img from '@/app/ui/image';
import Button from '@/app/ui/button';
import styles from '@/app/assets/css/LoginForm.module.css';

export default function Login() {
  const { pending } = useFormStatus();
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <article className={styles.login}>
      <div className={styles.formCont}>
        <form action={dispatch}>
          <Img
            imgSrc="icons/wineSil.png"
            imgAlt="AK Fine Wines"
            imgWidth={38}
            imgHeight={75}
          />
          <h1 className={styles.hdr}>Login</h1>
          <div className={styles.msg}>
            To unlock exclusive offers
            <br />
            faster checkout and much more.
          </div>
          <div className={styles.formFields}>
            <div className={styles.inputField}>
              <label htmlFor="email" id="lblEmail">
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  aria-labelledby="lblEmail"
                  required
                />
              </label>
              <Img
                imgSrc="icons/key.svg"
                imgAlt="AK Fine Wines"
                imgWidth={38}
                imgHeight={75}
              />
            </div>
            <br />
            <div className={styles.inputField}>
              <label htmlFor="password" id="lblPassword">
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  aria-labelledby="lblPassword"
                  required
                  minLength={6}
                />
              </label>
              <Img
                imgSrc="icons/key.svg"
                imgAlt="AK Fine Wines"
                imgWidth={38}
                imgHeight={75}
              />
            </div>
          </div>
          <Button css="loginBtn" disabled={pending}>
            Sign in
          </Button>
          <div aria-live="polite" aria-atomic="true">
            {errorMessage && (
              <>
                <Img
                  imgSrc="icons/exclamationCircle.svg"
                  imgAlt="AK Fine Wines"
                  imgWidth={38}
                  imgHeight={75}
                />
                <p>{errorMessage}</p>
              </>
            )}
          </div>
        </form>
      </div>
    </article>
  );
}
