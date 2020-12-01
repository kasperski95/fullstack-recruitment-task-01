import { FormBloc } from './form-bloc';
import { FormBlocOptions } from './form-types';

const container: { [key: string]: FormBloc<any, any> | undefined } = {};

export function useFormBloc<T extends { [key: string]: any }, R>(
  token: string,
  initialData: T,
  options?: FormBlocOptions<T, R>
) {
  if (!container[token]) container[token] = new FormBloc(initialData, options);
  return container[token] as FormBloc<T, R>;
}
