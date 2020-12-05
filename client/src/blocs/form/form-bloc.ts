import { Bloc } from '@src/modules/react-bloc';
import * as FormEvents from './form-event';
import * as FormStates from './form-state';
import { FormBlocOptions } from './form-types';

export class FormBloc<T extends { [key: string]: any }, R> extends Bloc<
  FormEvents.FormEvent,
  FormStates.FormState
> {
  private data: T;

  constructor(private initialData: T, private options?: FormBlocOptions<T, R>) {
    super(new FormStates.Editable(initialData));
    this.data = initialData;
  }

  public getValue(id: keyof T) {
    return this.data[id];
  }

  async *mapEventToState(event: FormEvents.FormEvent) {
    if (event instanceof FormEvents.Update) {
      this.data = { ...this.data, [event.id]: event.value };
      yield new FormStates.Editable(this.data);
      if (this.options?.submitOnChange) this.dispatch(new FormEvents.Submit());
    } else if (event instanceof FormEvents.Submit) {
      try {
        yield new FormStates.Sending(this.data);
        if (this.options?.onSubmit) {
          const result = await this.options.onSubmit(this.data);
          if (this.options?.onSuccess && result) this.options.onSuccess(result);
        }
        yield new FormStates.Editable(this.data);
      } catch (err) {
        yield new FormStates.ServerError(this.data, err?.message);
      }
    }
    if (event instanceof FormEvents.Reset) {
      this.data = this.initialData;
      yield new FormStates.Editable(this.data);
    }
  }
}
