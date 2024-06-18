// import SideNav from "@/app/ui/manage/sidenav";
// import styles from '@/app/_assets/css/manage/ManageLayout.module.css';
import Container from '../ui/container/Container';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Container>{children}</Container>
    </>
  );
}
