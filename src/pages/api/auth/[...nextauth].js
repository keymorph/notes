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
        // If no error and we have user data, return it
        if (user?.data) {
          return user.data;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    // Ensures that the user id is passed to the client
    async jwt({ token, user }) {
      if (user) {
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
    signIn: "/auth",
    error: "/auth",
  },
});
