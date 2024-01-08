import { gql } from "@apollo/client";

export const CreateUserMutation = gql`
  mutation CreateUser($email: String!, $aws_id: String!) {
    createUser(userInput: { email: $email, aws_id: $aws_id }) {
      email
    }
  }
`;
