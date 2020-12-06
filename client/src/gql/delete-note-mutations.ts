import { gql } from './utils/gql';

export const deleteNoteMutation = gql<{ id: string }>`
  #graphql
  mutation($id: ID!) {
    deleteNote(id: $id)
  }
`;
