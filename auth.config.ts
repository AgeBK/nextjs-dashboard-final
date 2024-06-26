import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // TODO: check this process at end
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const isAdminPage = nextUrl.pathname.startsWith('/manage');
      const isLoginPage = nextUrl.pathname.startsWith('/login');
      const pathname = nextUrl.searchParams.get('callbackUrl') || '/';

      if (isLoginPage && isLoggedIn) {
        return Response.redirect(new URL(pathname, nextUrl));
      }

      if (isAdminPage) {
        if (!isLoggedIn) {
          return Response.redirect(new URL('/login', nextUrl));
        }
        return true;
        // return false; // Redirect unauthenticated users to login page
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
