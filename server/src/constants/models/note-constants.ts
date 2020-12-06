import { Note } from '../../models/entities/note';
import { ModelConstants } from '../../types';

export const noteConstants: ModelConstants<Note> = {
  id: 'id',
  content: 'content',
  date: 'date',
} as const;
