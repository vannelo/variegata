import NextAuth from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { CheckUserQuery } from "@/graphql/queries/CheckUser.query";
import { CreateUserMutation } from "@/graphql/mutations/CreateUser.mutation";

const client = new ApolloClient({
  uri: "https://variegataapi.com.mx/graphql",
  cache: new InMemoryCache(),
});

export const authOptions = {
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID,
      clientSecret: process.env.COGNITO_CLIENT_SECRET,
      issuer: process.env.COGNITO_ISSUER,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      try {
        const userExists = await client.query({
          query: CheckUserQuery,
          variables: {
            awsId: token.sub,
          },
        });
        if (userExists.data.checkUser === null) {
          await client.mutate({
            mutation: CreateUserMutation,
            variables: {
              email: session.user.email,
              aws_id: token.sub,
            },
          });
        }
      } catch (error) {
        console.error("Error", error);
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
