import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  try {
    const token = await getToken({
      req,
      secret: process.env.AUTH_SECRET as string,
    });

    console.log("User token:", token);
    console.log("Auth Secret:", process.env.AUTH_SECRET);
    console.log("Google ID:", process.env.AUTH_GOOGLE_ID);
    console.log("Google Secret:", process.env.AUTH_GOOGLE_SECRET);

    if (!token) {
      console.log("No token found, redirecting to login page");
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    console.log("Token found, proceeding to next middleware");
    return NextResponse.next();
  } catch (error) {
    console.error("Error in middleware:", error);
    // Decide how to handle errors - you might wasnt to redirect to an error page
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
}

export const config = {
  matcher: ["/settings/:path*", "/saved/:path*", "/:path/comments/", "/"],
};
