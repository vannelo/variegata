import NextAuth from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

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
      const checkUserQuery = gql`
        query CheckUser($awsId: String) {
          checkUser(awsId: $awsId) {
            email
          }
        }
      `;
      const createUserMutation = gql`
        mutation CreateUser($email: String!, $aws_id: String!) {
          createUser(userInput: { email: $email, aws_id: $aws_id }) {
            email
          }
        }
      `;

      try {
        const userExists = await client.query({
          query: checkUserQuery,
          variables: {
            awsId: token.sub,
          },
        });

        if (userExists.data.checkUser === null) {
          await client.mutate({
            mutation: createUserMutation,
            variables: {
              email: session.user.email,
              aws_id: token.sub,
            },
          });
        }
      } catch (error) {
        console.error("Error during user creation:", error);
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
