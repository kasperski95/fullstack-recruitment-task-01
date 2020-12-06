import { Note } from '@src/models/note';

export interface Actions {
  createNote: {
    content: string;
  };
  addNote: {
    note: Note;
  };
  addNotes: {
    notes: Note[];
  };
  deleteNode: {
    noteId: string;
  };
  ping: undefined;
}
