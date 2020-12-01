import { BlocEvent } from '@src/modules/react-bloc';

export abstract class ThemeEvent extends BlocEvent {}

export class Init extends ThemeEvent {}

export class Toggle extends ThemeEvent {}
