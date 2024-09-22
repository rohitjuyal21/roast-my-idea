import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export async function middleware(req: NextRequest) {
  const session = await auth();
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/login")) {
    return NextResponse.next();
  }

  console.log("user", session);
  console.log("Auth Secret", process.env.AUTH_SECRET);
  console.log("google id", process.env.AUTH_GOOGLE_ID);
  console.log("google secret", process.env.AUTH_GOOGLE_SECRET);

  if (!session?.user) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/settings/:path*", "/saved/:path*", "/:path/comments/", "/"],
};
