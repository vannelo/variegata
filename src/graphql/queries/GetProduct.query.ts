import { gql } from "@apollo/client";

export const GetProduct = gql`
  query GetProduct($productId: ID!) {
    product(id: $productId) {
      _id
      name
      price
      salePrice
      description
      endTime
      photos {
        url
      }
      bids {
        _id
        amount
        timestamp
      }
      store {
        name
        slug
        description
        logo
        facebook
        instagram
        phone
      }
    }
  }
`;
