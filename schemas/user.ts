import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query getUsers {
    users {
      id
      dni
      name
      last_name
      phone
      salary
      rol
    }
  }
`;

export const GET_USER = gql`
  query getUser($user_id: ID!) {
    user(id: $user_id) {
      id
      dni
      name
      last_name
      phone
      salary
      rol
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser(
    $dni: String!
    $last_name: String!
    $name: String!
    $password: String!
    $phone: String
    $salary: Float!
  ) {
    createUser(
      userInput: {
        dni: $dni
        last_name: $last_name
        name: $name
        password: $password
        phone: $phone
        salary: $salary
      }
    ) {
      id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $user_id: ID!
    $dni: String
    $last_name: String
    $name: String
    $phone: String
    $salary: Float
  ) {
    updateUser(
      id: $user_id
      userInput: {
        dni: $dni
        last_name: $last_name
        name: $name
        phone: $phone
        salary: $salary
      }
    ) {
      id
    }
  }
`;
