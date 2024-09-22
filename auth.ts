import NextAuth from "next-auth";
import google from "next-auth/providers/google";
import { dbConnect } from "./lib/db";
import { User } from "./models/User";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [google],
  pages: {
    signIn: "/login",
  },
  callbacks: {
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

    async session({ session }) {
      const currentUser = await User.findOne({ email: session?.user?.email });
      if (session && session.user) {
        session.user.id = currentUser._id.toString();
      }
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
});
