import { FetcherBloc } from './fetcher-bloc';

const container: { [key: string]: FetcherBloc<any, any> | undefined } = {};

export function useFetcherBloc<T, R>(
  token: string,
  fetch: (variables: T) => Promise<R>
) {
  if (!container[token]) container[token] = new FetcherBloc(fetch);
  return container[token] as FetcherBloc<T, R>;
}
