import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;
console.log("MONGODB_URI:", process.env.MONGODB_URI);
export const config = {
  matcher: ["/settings/:path*", "/saved/:path*", "/:path/comments/", "/login"],
  runtime: "nodejs",
  unstable_allowDynamic: [
    // allows a single file
    "/lib/db.ts",
    // use a glob to allow anything in the function-bind 3rd party module
    "/node_modules/mongoose/dist/**",
  ],
};
