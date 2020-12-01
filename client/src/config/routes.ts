export const routes = {
  home: '/',
  login: '/login',
  register: '/register',
} as const;

export const endpoints = {
  auth: 'auth',
} as const;

export const URI = {
  api: process.env.REACT_APP_API_URI!,
  statics: process.env.REACT_APP_STATICS_URI!,
  graphql: process.env.REACT_APP_GRAPHQL_URI!,
  graphqlSubscriptions: process.env.REACT_APP_GRAPHQL_SUBSCRIPTIONS_URI!,
} as const;
