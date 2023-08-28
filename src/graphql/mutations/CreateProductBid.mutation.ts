import { gql } from "@apollo/client";

export const CreateBid = gql`
  mutation CreateBid($productId: String!, $amount: Float!) {
    createBid(
      bidInput: { productId: $productId, userId: "user-ui", amount: $amount }
    ) {
      amount
    }
  }
`;
