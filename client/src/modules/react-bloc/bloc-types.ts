export abstract class BlocEvent {}

export abstract class BlocState {
  isEqual(state: BlocState): boolean {
    return false;
  }
}
