import Dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';
import { Actions, AppState } from './index';

export function reducer<K extends keyof Actions>(
  store: AppState,
  { type, payload }: { type: K; payload: Actions[K] }
): AppState {
  switch (type as keyof Actions) {
    case 'addNote':
      return {
        ...store,
        notes: [
          ...store.notes,
          { ...payload, date: new Date(), id: uuid() },
        ].sort((lhs, rhs) => {
          return Dayjs(lhs.date).isBefore(Dayjs(rhs.date)) ? 1 : -1;
        }),
      };
    case 'ping':
      console.log('pong');
      return store;
    default:
      return store;
  }
}
