import { BlocState } from '@src/modules/react-bloc';

export abstract class FetcherState extends BlocState {}

export class Loading extends FetcherState {}

export class NoResults extends FetcherState {}

export class Success<T> extends FetcherState {
  constructor(public result: T) {
    super();
  }
}
export class Failure extends FetcherState {
  constructor(public message: string) {
    super();
  }
}
