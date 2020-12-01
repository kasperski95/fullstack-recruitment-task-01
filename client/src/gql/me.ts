import { userConstants } from '@src/gql/constants/user-constants';
import { gql } from './utils/gql';
import { unwrap } from './utils/unwrap';

export const me = gql`{
  me {
    ${unwrap(userConstants.attributes)}
  }
}`;
