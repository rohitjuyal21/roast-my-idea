import { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { User } from "./models/User";
import { dbConnect } from "./lib/db";

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
      try {
        await dbConnect(); // Ensure the database is connected

        // Use optional chaining and nullish coalescing to handle undefined safely
        const user = await User.findOne({ email: session.user?.email });

        if (user) {
          // Safely assign user details to the session
          session.user = {
            ...session.user,
            id: user._id.toString(),
            name: user.name,
            email: user.email,
          };
        }
      } catch (error) {
        console.error(
          "Error connecting to the database in session callback:",
          error
        );
      }

      return session; // Always return the session, even if user is not found or error occurs
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
