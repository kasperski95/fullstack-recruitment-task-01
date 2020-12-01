import { Bloc } from "@src/modules/react-bloc";
import * as {{name.pascal}}Events from "./{{name.kebab}}-event";
import * as {{name.pascal}}States from "./{{name.kebab}}-state";

export class {{name.pascal}}Bloc extends Bloc<
  {{name.pascal}}Events.{{name.pascal}}Event,
  {{name.pascal}}States.{{name.pascal}}State
> {
  constructor() {
    super(new {{name.pascal}}States.Initial());
  }

  async *mapEventToState(event: {{name.pascal}}Events.{{name.pascal}}Event) {
    // TODO: implement
  }
}
