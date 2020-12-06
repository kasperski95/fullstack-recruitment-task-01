export abstract class EntityBase<T> {
  abstract id: string;
  abstract copyWith: (data: Partial<T>) => T;
  abstract buildFromStrings: (data: { [key in keyof T]: string }) => T;
}
