import { Note } from '@src/models/note';

export interface Actions {
  addNote: {
    content: string;
  };
  addNotes: {
    notes: Note[];
  };
  deleteNode: {
    noteId: string;
  };
  ping: undefined;
}
