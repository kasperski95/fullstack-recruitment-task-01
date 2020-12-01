import { FetcherBloc, FetcherStates } from '@src/blocs/fetcher';
import { createUseStyle } from '@src/config/theme';
import { BlocBuilder } from '@src/modules/react-bloc';
import React from 'react';
import { ErrorBox } from '../error-box';
import { LoadingIndicator } from '../loading-indicator';

export function Fetcher<S, T>(props: {
  fetcherBloc: FetcherBloc<S, T>;
  builder: (result: T) => JSX.Element;
}) {
  const { styles } = useStyle();

  return (
    <BlocBuilder
      bloc={props.fetcherBloc}
      builder={(state) => {
        if (state instanceof FetcherStates.Success) {
          return props.builder(state.result);
        } else if (state instanceof FetcherStates.Failure) {
          return <ErrorBox title='Error' message={state.message} />;
        } else if (state instanceof FetcherStates.Loading) {
          return (
            <div style={styles.loadingWrapper}>
              <LoadingIndicator />
            </div>
          );
        } else if (state instanceof FetcherStates.NoResults) {
          return <div style={styles.noResultsWrapper}>No results.</div>;
        }

        return <div>Unexpected state</div>;
      }}
    />
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => ({
  loadingWrapper: {
    display: 'flex',
    justifyContent: 'center',
    padding: dimensions.gutterLarge,
  },
  noResultsWrapper: {
    ...shared.typography.h2,
    display: 'flex',
    padding: dimensions.gutterLarge,
    justifyContent: 'center',
  },
}));
