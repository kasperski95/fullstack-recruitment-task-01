export type ModelConstants<T> = {
  [key in keyof Partial<T>]: string;
};

export type ModelGQLConstants<T> = {
  attributes: ModelConstants<T>;
  relations: ModelConstants<T>;
};
