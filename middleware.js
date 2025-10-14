import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

// really simple way to protect a route from users not logged in
// export { default } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    console.log(req.nextUrl.pathname);
    console.log(req.nextauth.token.role);

    if (
      req.nextUrl.pathname.startsWith("/CreateUser") &&
      req.nextauth.token.role != "admin"
    ) {
      return NextResponse.rewrite(new URL("/Denied", req.url));
      //added the withauth comment
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/CreateUser", "/Member"],
};
