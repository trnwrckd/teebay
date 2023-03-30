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

const GET_PRODUCTS_BY_USER_ID = gql`
  query getProductsByUserId($id: String) {
    productsByUserId(id: $id) {
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
      viewCount
      createdAt
    }
  }
`;

const GET_BOUGHT_PRODUCTS_BY_USER_ID = gql`
  query getBoughtProductsByUserId($id: String) {
    boughtProductsByUserId(id: $id) {
      id
      boughtBy
      productOwner
      productDetails {
        id
        title
        categories
        description
        price
        rentPrice
        rentDuration
        viewCount
        createdAt
      }
    }
  }
`;
const GET_SOLD_PRODUCTS_BY_USER_ID = gql`
  query getSoldProductsByUserId($id: String) {
    soldProductsByUserId(id: $id) {
      id
      boughtBy
      productOwner
      productDetails {
        id
        title
        categories
        description
        price
        rentPrice
        rentDuration
        viewCount
        createdAt
      }
    }
  }
`;

const GET_LENT_PRODUCTS_BY_USER_ID = gql`
  query getLentProductsByUserId($id: String) {
    lentProductsByUserId(id: $id) {
      productDetails {
        id
        title
        categories
        description
        price
        rentPrice
        rentDuration
        viewCount
        createdAt
      }
    }
  }
`;

const GET_BORROWED_PRODUCTS_BY_USER_ID = gql`
  query getBorrowedProductsByUserId($id: String) {
    borrowedProductsByUserId(id: $id) {
      productDetails {
        id
        title
        categories
        description
        price
        rentPrice
        rentDuration
        viewCount
        createdAt
      }
    }
  }
`;

export {
  GET_ALL_PRODUCTS,
  GET_PRODUCTS_BY_USER_ID,
  GET_BOUGHT_PRODUCTS_BY_USER_ID,
  GET_SOLD_PRODUCTS_BY_USER_ID,
  GET_LENT_PRODUCTS_BY_USER_ID,
  GET_BORROWED_PRODUCTS_BY_USER_ID,
};
