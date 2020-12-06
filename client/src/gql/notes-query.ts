import { noteConstants } from '@src/gql/constants/note-constants';
import { gql } from './utils/gql';
import { unwrap } from './utils/unwrap';

export const notesQuery = gql<{
  first: number;
  after: undefined | string;
}>`#graphql
  query($first: Int!, $after: ID) {
    notes(first: $first, after: $after) {
      ${unwrap(noteConstants.attributes)}
    }
  }
`;
