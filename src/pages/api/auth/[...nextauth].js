import axios from "axios";
import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

/*
 *  NextAuth configuration
 *  All requests to /api/auth/* (signIn, callback, signOut, etc.) will automatically be handled by NextAuth.js.
 */
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("Credentials request", req.body);
        const res = await axios.get("/api/user", {
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    // Ensures that the user id is passed to the client
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  },
  pages: {
    signIn: "/auth",
    signOut: "/auth",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/dashboard", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
});
