export interface Actions {
  addNote: {
    content: string;
  };
  deleteNode: {
    noteId: string;
  };
  ping: undefined;
}
