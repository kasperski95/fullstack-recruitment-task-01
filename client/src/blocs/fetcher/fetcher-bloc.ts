import { Bloc } from '@src/modules/react-bloc';
import * as FetcherEvents from './fetcher-event';
import * as FetcherStates from './fetcher-state';

export class FetcherBloc<T, R> extends Bloc<
  FetcherEvents.FetcherEvent,
  FetcherStates.FetcherState
> {
  constructor(private fetch: (variables: T) => Promise<R>) {
    super(new FetcherStates.Loading());
  }

  async *mapEventToState(event: FetcherEvents.FetcherEvent) {
    if (event instanceof FetcherEvents.Fetch) {
      try {
        yield new FetcherStates.Loading();
        await new Promise((resolve) => setTimeout(resolve, 250));
        const result = await this.fetch(event.variables);
        if (!result) {
          yield new FetcherStates.NoResults();
        } else {
          if (Array.isArray(result) && result.length === 0) {
            yield new FetcherStates.NoResults();
          } else {
            yield new FetcherStates.Success(result);
          }
        }
      } catch (err) {
        yield new FetcherStates.Failure(err?.message);
        console.error(err);
      }
    }
  }
}
