import { ModelConstants } from '@src/types';

export function unwrap<T>(modelConstants: ModelConstants<T>) {
  return Object.values(modelConstants).reduce((acc, propName) =>
    acc ? `${propName}, ${acc}` : propName
  );
}
