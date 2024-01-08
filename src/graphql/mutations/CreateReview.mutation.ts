import { gql } from "@apollo/client";

export const CreateReviewMutation = gql`
  mutation CreateReview(
    $comment: String!
    $storeId: String!
    $rating: Float!
    $userId: String!
  ) {
    createReview(
      reviewInput: {
        comment: $comment
        storeId: $storeId
        rating: $rating
        userId: $userId
      }
    ) {
      comment
    }
  }
`;
