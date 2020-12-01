import React, { useEffect } from 'react';
import { Bloc } from './bloc';
import { BlocEvent, BlocState } from './bloc-types';

interface BlocBuilderProps<E extends BlocEvent, S extends BlocState> {
  bloc: Bloc<E, S>;
  builder: (blocState: S) => JSX.Element;
  listener?: (blocState: S) => void;
  debugId?: string;
}

export function BlocBuilder<E extends BlocEvent, S extends BlocState>(
  props: BlocBuilderProps<E, S>
) {
  const [state, setState] = React.useState(null as S | null);

  useEffect(() => {
    const sub = props.bloc.subscribe((newState) => {
      setState(newState);
      if (props.listener) props.listener(newState);
    });
    return () => {
      sub.unsubscribe();
    };
  });

  return props.builder(state || props.bloc.initialState);
}
