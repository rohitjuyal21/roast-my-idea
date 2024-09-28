import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { dbConnect } from "./lib/db";
import { User } from "./models/User";

export const authConfig: NextAuthConfig = {
  providers: [Google],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      if (nextUrl.pathname === "/login") {
        if (isLoggedIn) {
          return Response.redirect(new URL("/", nextUrl));
        }
        return true;
      }

      if (!isLoggedIn) {
        return Response.redirect(new URL("/login", nextUrl));
      }

      return true;
    },
    async signIn({ user, account }) {
      await dbConnect();

      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
          googleId: account?.providerAccountId,
        });
      }

      return true;
    },

    async session({ session, token }) {
      await dbConnect();
      console.log(session.user.email);
      console.log(token);
      const currentUser = await User.find({ email: session.user.email });
      console.log(currentUser);
      return session;
    },
    async jwt({ token, account }) {
      if (account?.providerAccountId) {
        token.sub = account.providerAccountId;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
};
