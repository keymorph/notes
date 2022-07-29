import axios from "axios";
import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { createOAuthUserIfNotExists } from "../../../api/services/oauth-user";

/*
 *  NextAuth configuration
 *  All requests to /api/auth/* (signIn, callback, signOut, etc.) will automatically be handled by NextAuth.js.
 */
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
            email: credentials.email,
            password: credentials.password,
          })
          .catch((error) => {
            console.error(error.message);
          });
        // user will be undefined if the credentials are invalid
        // If we have user data, return it
        return user?.data;
      },
    }),
  ],
  callbacks: {
    // Ensure that the user id and email is passed to the client's cookie
    async jwt({ token, user }) {
      if (user && !user.user_id) {
        // Temporary cosmosdb solution for getting the user id and/or creating an account for oauth users
        token.user_id = await createOAuthUserIfNotExists(user.email).catch(
          (error) => {
            console.error(error.message);
          }
        );
      } else if (user) {
        token.email = user.email;
        token.user_id = user.user_id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.user_id;
        session.user.email = token.email;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth?action=login",
    newUser: "/dashboard",
    signOut: "/auth",
    error: "/auth",
  },
  debug: process.env.NODE_ENV === "development",
};

export default NextAuth(authOptions);
