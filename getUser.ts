import { auth } from './auth';

export default async function getUser() {
  const session = await auth(); // name/email
  return session?.user?.name || null;
}
