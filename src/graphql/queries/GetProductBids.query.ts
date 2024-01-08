import { gql } from "@apollo/client";

export const GetProductBidsQuery = gql`
  query GetProductBids($productId: String!) {
    getProductBids(productId: $productId) {
      _id
      amount
      timestamp
      userId
    }
  }
`;
