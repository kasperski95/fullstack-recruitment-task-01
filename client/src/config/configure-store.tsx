import React from 'react';
import { Actions, AppState, state as initialState } from './store';
import { reducer } from './store/reducer';

let StateContext: React.Context<AppState>;
let DispatcherContext: React.Context<
  (<K extends keyof Actions>(action: K) => (payload: Actions[K]) => void) | null
>;

export function useConfigureStore() {
  StateContext = React.createContext(initialState);
  DispatcherContext = React.createContext(
    null as
      | (<K extends keyof Actions>(action: K) => (payload: Actions[K]) => void)
      | null
  );

  return StoreProvider;
}

function StoreProvider(props: { children: React.ReactChild }) {
  const [appState, dispatch] = React.useReducer(reducer, initialState);

  const curriedDispatcher = React.useCallback(
    (action: keyof Actions) => (payload: any) => {
      dispatch({ type: action, payload });
    },
    [dispatch]
  );

  return (
    <DispatcherContext.Provider value={curriedDispatcher}>
      <StateContext.Provider value={appState}>
        {props.children}
      </StateContext.Provider>
    </DispatcherContext.Provider>
  );
}

export function useStore() {
  return {
    state: React.useContext(StateContext),
    dispatch: React.useContext(DispatcherContext)!,
  };
}

export interface SelectorOutput {
  actions?: { [key: string]: (args: any) => void };
  state?: Object;
}

export function withStore<P, T extends SelectorOutput>(
  Component: (props: T & P) => JSX.Element,
  selector: (
    state: AppState,
    dispatch: <K extends keyof Actions>(
      action: K
    ) => (payload: Actions[K]) => void
  ) => T
) {
  return (props: P) => {
    const state = React.useContext(StateContext);
    const dispatch = React.useContext(DispatcherContext)!;

    return (
      // @ts-ignore
      <Component {...(props || {})} {...selector(state, dispatch)} />
    );
  };
}
