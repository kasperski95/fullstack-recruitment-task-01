import jwt from 'jsonwebtoken';
import { User } from '../models/entities/user';

export function generateJWT(user: User) {
  return jwt.sign(user.id, process.env.TOKEN_SECRET);
}

export function decodeJWT(token: string) {
  const result = jwt.decode(token);
  return result.toString();
}
