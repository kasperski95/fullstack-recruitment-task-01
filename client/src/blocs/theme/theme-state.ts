import { BlocState } from '@src/modules/react-bloc';

export abstract class ThemeState extends BlocState {}

export class Dark extends ThemeState {}

export class Light extends ThemeState {}
