export const routes = {
  home: '/',
  details: '/details',
} as const;

export const endpoints = {} as const;

export const URI = {
  api: undefined,
  graphql: process.env.REACT_APP_GRAPHQL_URI!,
} as const;
