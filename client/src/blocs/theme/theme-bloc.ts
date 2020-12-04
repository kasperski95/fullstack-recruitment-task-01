import { Themes } from '@src/modules/css-in-jsx';
import { Bloc } from '@src/modules/react-bloc';
import * as ThemeEvents from './theme-event';
import * as ThemeStates from './theme-state';

export class ThemeBloc extends Bloc<
  ThemeEvents.ThemeEvent,
  ThemeStates.ThemeState
> {
  constructor() {
    super(new ThemeStates.Light());
  }

  public isDarkTheme() {
    return super.getState() instanceof ThemeStates.Dark;
  }

  async *mapEventToState(event: ThemeEvents.ThemeEvent) {
    if (event instanceof ThemeEvents.Init) {
      switch (localStorage.getItem('theme') as Themes) {
        case 'light':
          yield new ThemeStates.Light();
          break;
        default:
          yield new ThemeStates.Dark();
          break;
      }
    } else if (event instanceof ThemeEvents.Toggle) {
      if (super.getState() instanceof ThemeStates.Dark) {
        yield new ThemeStates.Light();
        localStorage.setItem('theme', 'light');
      } else {
        yield new ThemeStates.Dark();
        localStorage.setItem('theme', 'dark');
      }
    }
  }
}
