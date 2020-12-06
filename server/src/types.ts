import { InMemoryDatabase } from './utils/in-memory-database';

export interface Context {
  db: InMemoryDatabase;
}

export type ModelConstants<T> = {
  [key in keyof Partial<T>]: string;
};
