import { gql } from '@apollo/client';

const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: String) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

const PURCHASE_PRODUCT = gql`
  mutation purchaseProduct(
    $productId: String
    $productOwner: String
    $boughtBy: String
  ) {
    purchaseProduct(
      productId: $productId
      productOwner: $productOwner
      boughtBy: $boughtBy
    ) {
      id
    }
  }
`;

const RENT_PRODUCT = gql`
  mutation rentProduct(
    $productId: String
    $productOwner: String
    $borrowedBy: String
  ) {
    rentProduct(
      productId: $productId
      productOwner: $productOwner
      borrowedBy: $borrowedBy
    ) {
      id
    }
  }
`;

const UPDATE_PRODUCT = gql`
  mutation updateProduct(
    $id: String
    $title: String
    $description: String
    $categories: [String]
    $price: Int
    $rentPrice: Int
    $rentDuration: String
  ) {
    updateProduct(
      id: $id
      title: $title
      description: $description
      categories: $categories
      price: $price
      rentPrice: $rentPrice
      rentDuration: $rentDuration
    ) {
      id
    }
  }
`;

export { DELETE_PRODUCT, PURCHASE_PRODUCT, RENT_PRODUCT, UPDATE_PRODUCT };
