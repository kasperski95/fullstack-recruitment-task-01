import { noteConstants } from '@src/gql/constants/note-constants';
import { gql } from './utils/gql';
import { unwrap } from './utils/unwrap';

export const noteQuery = gql<{
  id: string;
}>`#graphql
  query($id: ID!) {
    note(id: $id) {
      ${unwrap(noteConstants.attributes)}
    }
  }
`;
