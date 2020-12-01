import { userConstants } from './constants/user-constants';
import { gql } from './utils/gql';
import { unwrap } from './utils/unwrap';

export const createUser = gql<{
  data: { email: string; password: string };
}>`#graphql
  mutation($data: CreateUserArgs!) {
    createUser(data: $data) {
      ${unwrap(userConstants.attributes)}
    }
  }
`;
