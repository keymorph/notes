import axios from "axios";
import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import {createOAuthUserIfNotExists} from "../../../utils/api/oauth-user";

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
    // Ensure that the user id is passed to the client's cookie
    async jwt({ token, user }) {
      if (user && !user.userID) {
        // Temporary cosmosdb solution for getting the user id and/or creating an account for oauth users
        token.userID = await createOAuthUserIfNotExists(user.email).catch(
          (error) => {
            console.error(error.message);
          }
        );
      } else if (user) {
        token.userID = user.userID;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.userID;
      }
      return session;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    // Specify that the session is using JWT
    jwt: true,
  },
  pages: {
    signIn: "/dashboard",
    newUser: "/dashboard",
    signOut: "/auth",
    error: "/auth",
  },
});
