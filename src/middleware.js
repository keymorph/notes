import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    // Temporary solution, pending release with a fix for the following issue:
    // https://github.com/nextauthjs/next-auth/issues/4848
    authorized: async ({ req, token }) => {
      const pathname = req.nextUrl.pathname;

      if (pathname.startsWith("/_next") || pathname === "/favicon.ico")
        return true;

      return !!token;
    },
  },
  pages: {
    signIn: "/auth?action=login",
    newUser: "/dashboard",
    signOut: "/auth",
    error: "/auth",
  },
});

export const config = {
  matcher: ["/auth", "/dashboard"],
};
