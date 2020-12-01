import { BlocEvent } from '@src/modules/react-bloc';

export abstract class UserEvent extends BlocEvent {}

export class Change extends UserEvent {
  constructor(public jwt: string) {
    super();
  }
}

export class Logout extends UserEvent {}

export class Init extends UserEvent {}
