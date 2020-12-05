import { BlocEvent } from '@src/modules/react-bloc';

export abstract class FetcherEvent extends BlocEvent {}

export class Fetch<T> extends FetcherEvent {
  constructor(public variables?: T) {
    super();
  }
}

export class Reset extends FetcherEvent {}
