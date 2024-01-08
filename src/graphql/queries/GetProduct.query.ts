import { gql } from "@apollo/client";

export const GetProductQuery = gql`
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
        _id
        name
        slug
        description
        logo
        facebook
        instagram
        phone
        reviews {
          _id
          rating
          comment
        }
      }
    }
  }
`;
