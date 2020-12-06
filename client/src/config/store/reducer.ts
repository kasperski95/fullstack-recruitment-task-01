import Dayjs from 'dayjs';
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
          (lhs, rhs) => {
            const lhsDate = Dayjs(lhs.date);
            const rhsDate = Dayjs(rhs.date);
            if (lhsDate.isSame(rhsDate, 'ms')) {
              return lhs.id.localeCompare(rhs.id);
            } else
              return Dayjs(lhs.date).isBefore(Dayjs(rhs.date), 'ms') ? 1 : -1;
          }
        ),
      };

    case 'deleteNode':
      const { noteId } = payload as Actions['deleteNode'];

      return {
        ...store,
        notes: [...store.notes.filter(({ id }) => id !== noteId)],
      };

    case 'ping':
      console.log('pong');
      return store;

    default:
      console.error(`Unhandled actions ${type}`);
      return store;
  }
}
