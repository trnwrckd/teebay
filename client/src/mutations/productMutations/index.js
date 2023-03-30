import { gql } from '@apollo/client';

const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: String) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

export { DELETE_PRODUCT };
