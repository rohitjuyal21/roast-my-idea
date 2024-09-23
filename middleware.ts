import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authConfig } from "@/auth.config";

const { auth } = NextAuth(authConfig);

function combineMiddleware(...middlewares: Function[]) {
  return async (req: NextRequest) => {
    for (const middleware of middlewares) {
      const result = await middleware(req, NextResponse.next(), () => {});
      if (result instanceof Response || result instanceof NextResponse) {
        return result;
      }
    }
    return NextResponse.next();
  };
}

export default combineMiddleware(auth);

export const config = {
  matcher: ["/settings/:path*", "/saved/:path*", "/:path/comments/", "/"],
};
