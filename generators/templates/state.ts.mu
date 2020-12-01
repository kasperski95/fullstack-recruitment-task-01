import { BlocState } from "@src/modules/react-bloc";

export abstract class {{name.pascal}}State extends BlocState {}

export class Initial extends {{name.pascal}}State {
  constructor() {
    super();
  }
}