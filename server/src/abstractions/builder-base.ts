export abstract class BuilderBase<T> {
  abstract build(): T;

  protected promisify<T>(obj: T): Promise<T> {
    if (!obj) throw new Error('Promisify requires object to be not null.');
    return Promise.resolve(obj);
  }
}
