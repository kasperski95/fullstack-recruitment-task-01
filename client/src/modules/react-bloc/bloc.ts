import { BehaviorSubject } from 'rxjs';
import { BlocEvent, BlocState } from './bloc-types';

export abstract class Bloc<E extends BlocEvent, S extends BlocState> {
  static logger: {
    info: typeof console.info;
    log: typeof console.log;
    error: typeof console.error;
  };

  abstract mapEventToState(event: E): AsyncGenerator<S>;

  private behaviorSubject: BehaviorSubject<S>;

  constructor(public initialState: S, private debugLabel?: string) {
    this.behaviorSubject = new BehaviorSubject(initialState);
  }

  public getState() {
    return this.behaviorSubject.value;
  }

  public subscribe(listener: (blocState: S) => void) {
    return this.behaviorSubject.subscribe((state) => {
      listener(state);
    });
  }

  public async dispatch(event: E) {
    try {
      let generator = this.mapEventToState(event);
      let isDone;

      do {
        const { value: state, done } = await generator.next();
        isDone = done;

        if (state) {
          if (state instanceof BlocState) {
            if (state.isEqual(this.behaviorSubject.value)) {
              continue;
            }
          }

          if (Bloc.logger) {
            Bloc.logger.info(
              `%c[${new Date().toLocaleTimeString()}] ${
                this.debugLabel
                  ? `${this.debugLabel} (${this.constructor.name})`
                  : `(${this.constructor.name})`
              }\non ${event?.constructor.name}: ${
                this.behaviorSubject.value.constructor.name
              } → ${state?.constructor.name}`,
              'color: cyan'
            );
          }

          this.behaviorSubject.next(state);
        }
      } while (!isDone);
    } catch (e) {
      if (Bloc.logger) {
        Bloc.logger.info('[BLOC ERROR]');
        Bloc.logger.error(e);
      }
    }
  }
}
