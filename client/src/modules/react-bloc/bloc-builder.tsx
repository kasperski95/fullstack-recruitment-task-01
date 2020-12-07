import React, { useEffect } from 'react';
import { Bloc } from './bloc';
import { BlocEvent, BlocState } from './bloc-types';

interface BlocBuilderProps<E extends BlocEvent, S extends BlocState> {
  bloc: Bloc<E, S>;
  builder: (blocState: S) => JSX.Element;
  listener?: (blocState: S) => void;
  debugId?: string;
}

export function BlocBuilder<E extends BlocEvent, S extends BlocState>({
  listener,
  bloc,
  builder,
}: BlocBuilderProps<E, S>) {
  const [state, setState] = React.useState(null as S | null);

  useEffect(() => {
    const sub = bloc.subscribe((newState) => {
      setState(newState);
      if (listener) listener(newState);
    });
    return () => {
      sub.unsubscribe();
    };
  }, [bloc, listener]);

  return builder(state || bloc.initialState);
}
