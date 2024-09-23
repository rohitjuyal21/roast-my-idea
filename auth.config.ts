import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      if (isLoggedIn) {
        return true;
      } else {
        return Response.redirect(new URL("/login", nextUrl));
      }
    },
  },
  providers: [],
} satisfies NextAuthConfig;
