import { BlocEvent } from '@src/modules/react-bloc';

export abstract class FormEvent extends BlocEvent {}

export class Update<T extends { [key: string]: any }> extends FormEvent {
  constructor(public id: keyof T, public value: any) {
    super();
  }
}

export class Reset extends FormEvent {}

export class Submit extends FormEvent {}
