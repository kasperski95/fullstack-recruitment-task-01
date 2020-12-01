import { buildSchema } from 'type-graphql';
import { createAuthChecker } from './create-auth-checker';

export async function generateSchema() {
  return await buildSchema({
    resolvers: [
      __dirname + '/../resolvers/**/*.{ts,js}',
      __dirname + '/../subscriptions/**/*.{ts,js}',
    ],
    validate: false, // fixes "no metadata found" warnings
    authChecker: createAuthChecker,
  });
}
