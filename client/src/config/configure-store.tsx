import React from 'react';
import { Actions, store as initialStore, Store } from './store';
import { reducer } from './store/reducer';

type Dispatch<K extends keyof Actions> = (action: {
  type: K;
  payload: Actions[K];
}) => void;

interface StoreContext<K extends keyof Actions> {
  state: Store;
  dispatch: Dispatch<K>;
}

let StoreContext: React.Context<StoreContext<keyof Actions>>;

export function useStore() {
  const [store, dispatch] = React.useReducer(reducer, initialStore);
  StoreContext = React.createContext({ state: store, dispatch });

  return {
    StoreProvider: (props: { children: React.ReactChild }) => {
      return (
        <StoreContext.Provider value={{ state: store, dispatch }}>
          {props.children}
        </StoreContext.Provider>
      );
    },
  };
}

export function useAppReducer() {
  return React.useContext(StoreContext);
}
