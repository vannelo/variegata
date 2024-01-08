import { gql } from "@apollo/client";

export const CheckUserQuery = gql`
  query CheckUser($awsId: String) {
    checkUser(awsId: $awsId) {
      email
    }
  }
`;
