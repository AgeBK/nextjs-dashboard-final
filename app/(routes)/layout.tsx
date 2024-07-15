import Container from '../ui/container/Container';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Container>{children}</Container>;
}
