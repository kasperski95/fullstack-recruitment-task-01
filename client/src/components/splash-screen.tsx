import { createUseStyle } from '@src/config/theme';
import React from 'react';
import { LoadingIndicator } from './loading-indicator';

export function SplashScreen() {
  const { styles } = useStyle();

  return (
    <div style={styles.container}>
      <LoadingIndicator />
    </div>
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
