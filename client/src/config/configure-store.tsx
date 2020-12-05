import React from 'react';
import { Actions, AppState, state as initialStore } from './store';
import { reducer } from './store/reducer';

interface StoreContext<K extends keyof Actions> {
  state: AppState;
  dispatch: <K extends keyof Actions>(
    action: K
  ) => (payload: Actions[K]) => void;
}

let StoreContext: React.Context<StoreContext<keyof Actions>>;

export function useConfigureStore() {
  const [store, dispatch] = React.useReducer(reducer, initialStore);
  const curriedDispatcher = (action: keyof Actions) => (payload: any) => {
    dispatch({ type: action, payload });
  };

  StoreContext = React.createContext({
    state: store,
    dispatch: curriedDispatcher,
  });

  return {
    StoreProvider: (props: { children: React.ReactChild }) => {
      return (
        <StoreContext.Provider
          value={{ state: store, dispatch: curriedDispatcher }}
        >
          {props.children}
        </StoreContext.Provider>
      );
    },
  };
}

export function useStore() {
  return React.useContext(StoreContext);
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
    const { state, dispatch } = useStore();

    return (
      // @ts-ignore
      <Component {...(props || {})} {...selector(state, dispatch)} />
    );
  };
}
