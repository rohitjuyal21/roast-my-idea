import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authConfig } from "@/auth.config";

// export default NextAuth(authConfig).auth;

const { auth } = NextAuth(authConfig);

export async function logRequest(
  req: NextRequest,
  res: NextResponse,
  next: Function
) {
  console.log(`My Request URL: ${req.url}`);
  next();
}

function combineMiddleware(...middlewares: Function[]) {
  return async (req: NextRequest) => {
    console.log("Reached the combined middleware");
    for (const middleware of middlewares) {
      const result = await middleware(req, NextResponse.next(), () => {});
      if (result instanceof Response || result instanceof NextResponse) {
        return result;
      }
    }
    return NextResponse.next();
  };
}

export default combineMiddleware(logRequest, auth);

export const config = {
  matcher: ["/settings/:path*", "/saved/:path*", "/:path/comments/", "/"],
};
