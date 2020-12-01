import { Loaders } from "./loaders";

export class Context {
  constructor(public loaders: Loaders, public userId: string | null) {}
}
