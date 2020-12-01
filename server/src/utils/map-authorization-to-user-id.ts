import { decodeJWT } from '../auth/jwt';

export function mapAuthorizationToUserId(token: string | undefined) {
  if (token) return decodeJWT(token.replace('Bearer ', ''));
  return null;
}
