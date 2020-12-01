import { BlocState } from '@src/modules/react-bloc';

export abstract class FormState extends BlocState {}

export class Sending<T> extends FormState {
  constructor(public data: T) {
    super();
  }
}

export class Editable<T> extends FormState {
  constructor(public data: T) {
    super();
  }
}

export class ServerError<T> extends FormState {
  constructor(public data: T, public message: string) {
    super();
  }
}
