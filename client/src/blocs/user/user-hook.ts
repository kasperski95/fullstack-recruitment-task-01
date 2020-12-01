import { User } from '@src/models/user';
import { UserBloc } from './user-bloc';

let instance: UserBloc | null;

export function useUserBloc(
  authenticate?: (jwt: string) => Promise<User | null>
) {
  if (authenticate) instance = new UserBloc(authenticate);
  if (!instance) throw new Error('UserBloc has not been initialized.');
  return instance!;
}
