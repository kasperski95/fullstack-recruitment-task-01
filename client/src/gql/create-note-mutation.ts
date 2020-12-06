import { noteConstants } from '@src/gql/constants/note-constants';
import { gql } from './utils/gql';
import { unwrap } from './utils/unwrap';

export const createNoteMutation = gql<{ data: { content: string } }>`#graphql
mutation($data: CreateNoteInput!) {
  createNote(data: $data) {
    ${unwrap(noteConstants.attributes)}
  }
}
`;
