import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  pages: { signIn: "/entrar" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = {
          id: "1",
          name: "Preview Deployment",
          email: "preview@deployment.com",
        };
        return user;
      },
    }),
  ],
};

export default NextAuth(authOptions);
