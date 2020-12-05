export interface Actions {
  addNote: {
    content: string;
  };
  deleteNode: {
    nodeId: string;
  };
  ping: undefined;
}
