import { compareNotes } from '@src/gql/utils/compare-notes';
import { v4 as uuid } from 'uuid';
import { Actions, AppState } from './index';

export function reducer(
  store: AppState,
  { type, payload }: { type: keyof Actions; payload: Actions[typeof type] }
): AppState {
  switch (type) {
    case 'addNote':
      const { content } = payload as Actions['addNote'];

      return {
        ...store,
        notes: [...store.notes, { content, date: new Date(), id: uuid() }].sort(
          compareNotes
        ),
      };

    case 'deleteNode':
      const { noteId } = payload as Actions['deleteNode'];

      return {
        ...store,
        notes: [...store.notes.filter(({ id }) => id !== noteId)],
      };

    case 'addNotes':
      const { notes } = payload as Actions['addNotes'];

      return {
        ...store,
        notes: [...store.notes, ...notes].sort(compareNotes),
      };

    case 'ping':
      console.log('pong');
      return store;

    default:
      console.error(`Unhandled actions ${type}`);
      return store;
  }
}
