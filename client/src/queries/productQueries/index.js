import { gql } from '@apollo/client';

const GET_ALL_PRODUCTS = gql`
  query getAllProducts {
    products {
      id
      title
      categories
      description
      price
      rentPrice
      rentDuration
      purchaseInfo {
        id
      }
      rentInfo {
        id
      }
      postedByUser {
        firstName
        lastName
      }
      viewCount
      createdAt
    }
  }
`;

export { GET_ALL_PRODUCTS };
