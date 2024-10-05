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
