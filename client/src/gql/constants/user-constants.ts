import { User } from '@src/models/user';
import { ModelGQLConstants } from '@src/types';

export const userConstants: ModelGQLConstants<User> = {
  attributes: {
    id: 'id',
    email: 'email',
    password: 'password',
    role: 'role',
  },
  relations: {},
} as const;
