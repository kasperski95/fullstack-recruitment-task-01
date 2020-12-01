import { CircularProgress } from '@material-ui/core';
import { createUseStyle } from '@src/config/theme';
import React from 'react';

export function LoadingIndicator() {
  const { styles } = useStyle();

  return <CircularProgress style={styles.container} />;
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => ({
  container: {
    color: theme.accent.main,
  },
}));
