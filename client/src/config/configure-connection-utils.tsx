import { GQLContainer } from '@src/gql/utils/gql';
import axios from 'axios';
import React from 'react';
import { endpoints, URI } from './routes';

let ConnectionContext: React.Context<
  ReturnType<typeof _configureConnectionUtils>
>;

type Endpoint = typeof endpoints[keyof typeof endpoints];

export function useConnection() {
  return React.useContext(ConnectionContext);
}

export function configureConnectionUtils(jwt?: string) {
  const backendUtils = _configureConnectionUtils(jwt);
  ConnectionContext = React.createContext(backendUtils);

  return {
    ConnectionProvider: (props: { children: React.ReactNode }) => {
      return <ConnectionContext.Provider value={backendUtils} {...props} />;
    },
  };
}

type Query = { suffix: string; data: { [key: string]: string | number } };

interface Options {
  params?: { [key: string]: string | number };
  query?: Query;
}

function generateSuffix(query: Query) {
  return Object.entries(query.data).reduce((acc, [key, value]) => {
    return acc.replace(':' + key, value.toString());
  }, query.suffix);
}

export function _configureConnectionUtils(jwt?: string) {
  const headers = {
    authorization: jwt ? `Bearer ${jwt}` : undefined,
  };

  return {
    async read(endpoint: Endpoint, options?: Options) {
      const suffix = options?.query ? generateSuffix(options.query) : '';

      const result = await axios.get(`${URI.api}/${endpoint}${suffix}`, {
        params: options?.params,
        headers,
      });
      return result.data;
    },

    async create(endpoint: Endpoint, data?: any) {
      const result = await axios.post(`${URI.api}/${endpoint}`, data, {
        headers,
      });
      return result.data;
    },

    async update(endpoint: Endpoint, data?: any, options?: Options) {
      const suffix = options?.query ? generateSuffix(options.query) : '';

      const result = await axios.put(`${URI.api}/${endpoint}${suffix}`, data, {
        headers,
      });
      return result.data;
    },

    async remove(endpoint: Endpoint, options?: Options) {
      const suffix = options?.query ? generateSuffix(options.query) : '';

      const result = await axios.delete(`${URI.api}/${endpoint}${suffix}`, {
        headers,
      });
      return result.data;
    },

    async gql<T, V>(gqlContainer: GQLContainer<V>) {
      const { query: documentNode, variables } = gqlContainer;

      const body = JSON.stringify({
        query: documentNode.loc?.source.body,
        variables,
      });

      const res = await fetch(URI.graphql, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
        },
        body,
      });

      const result = await res.json();

      if (!res.ok) {
        console.log(documentNode.loc?.source.body);
        console.log(variables);
      }
      if (result.errors) {
        throw new Error(result.errors);
      }

      const queryName = documentNode.loc?.source.body
        .substr(documentNode.loc?.source.body.indexOf('{'))
        .replace('{', '')
        .replace('(', ' ')
        .trim()
        .split(' ')[0];

      if (queryName && result.data) return result.data[queryName] as T;
      return null;
    },
  };
}
