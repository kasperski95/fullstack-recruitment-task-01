import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/react-hooks';
import { URI } from '@src/config/routes';

export function configureApollo(jwt?: string) {
  // const wsLink = new WebSocketLink({
  //   uri: URI.graphqlSubscriptions,
  //   options: {
  //     reconnect: true,
  //     // reconnectionAttempts: 10,
  //     connectionParams: {
  //       authorization: jwt,
  //     },
  //   },
  // });

  const httpLink = new HttpLink({
    uri: URI.graphql,
  });
  const link = httpLink;

  // const link = split(
  //   ({ query }) => {
  //     const { kind, operation } = getMainDefinition(query) as any;
  //     return kind === 'OperationDefinition' && operation === 'subscription';
  //   },
  //   wsLink as any,
  //   httpLink
  // );

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
}
