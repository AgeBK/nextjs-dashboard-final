import { ReactNode } from "react";
import SessionProvider from "../SessionProvider"; //next SessionProvider imported
import { authConfig } from "@/auth.config";
import getServerSession from "next-auth";
import Header from "@/app/ui/header";
import Footer from "@/app/ui/footer";
import styles from "@/app/_assets/css/Container.module.css";

type ContainerProps = {
  children: ReactNode;
};

function Container({ children }: ContainerProps) {
  // const session = getServerSession(authConfig);
  // console.log(session);

  return (
    //   <SessionProvider session={session}>
    <div className={styles.container}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
    //  </SessionProvider>
  );
}
export default Container;
