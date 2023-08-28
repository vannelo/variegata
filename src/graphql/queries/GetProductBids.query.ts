import { gql } from "@apollo/client";

export const GetProductBids = gql`
  query GetProductBids($productId: String!) {
    getProductBids(productId: $productId) {
      _id
      amount
      timestamp
      userId
    }
  }
`;
