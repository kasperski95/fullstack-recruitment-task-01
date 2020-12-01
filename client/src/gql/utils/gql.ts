import { DocumentNode, gql as _gql } from 'apollo-boost';

export type GQLContainer<T> = { query: DocumentNode; variables: T };

export function gql<V>(
  ...args: Parameters<typeof _gql>
): (variables: V) => GQLContainer<V> {
  return (variables: V) => {
    return { query: _gql(...args), variables };
  };
}
