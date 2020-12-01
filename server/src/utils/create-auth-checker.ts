import { AuthChecker } from 'type-graphql';
import { getRepository } from 'typeorm';
import { User, UserRoles } from '../models/entities/user';
import { Context } from './context';

export const createAuthChecker: AuthChecker<Context, UserRoles> = async (
  { root, args, context, info },
  roles
) => {
  if (context.userId === null) return false;
  const user = await getRepository(User).findOne(context.userId);
  if (roles.length === 0 && user) return true;
  return roles.includes(user.role);
};
