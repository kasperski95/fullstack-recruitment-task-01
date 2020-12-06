import { Note } from '@src/models/note';
import { ModelGQLConstants } from '@src/types';

export const noteConstants: ModelGQLConstants<Note> = {
  attributes: {
    id: 'id',
    content: 'content',
    date: 'date',
  },
  relations: {},
} as const;
