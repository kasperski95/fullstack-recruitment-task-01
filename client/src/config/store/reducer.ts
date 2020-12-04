import { v4 as uuid } from 'uuid';
import { Actions, Store } from './index';

export function reducer<K extends keyof Actions>(
  store: Store,
  { type, payload }: { type: K; payload: Actions[K] }
): Store {
  switch (type as keyof Actions) {
    case 'addNote':
      return {
        ...store,
        notes: [...store.notes, { ...payload, date: new Date(), id: uuid() }],
      };
    default:
      return store;
  }
}
