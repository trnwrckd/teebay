import { gql } from '@apollo/client';

const LOGIN = gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
      id
      email
    }
  }
`;

const REGISTER = gql`
  mutation Register(
    $firstName: String
    $lastName: String
    $address: String
    $email: String
    $phone: String
    $password: String
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      address: $address
      email: $email
      phone: $phone
      password: $password
    ) {
      id
    }
  }
`;

export { LOGIN, REGISTER };
