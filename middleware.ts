import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET!,
  });

  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/login")) {
    return NextResponse.next();
  }

  console.log("user", token);
  console.log("Auth Secret", process.env.AUTH_SECRET);
  console.log("google id", process.env.AUTH_GOOGLE_ID);
  console.log("google secret", process.env.AUTH_GOOGLE_SECRET);

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
