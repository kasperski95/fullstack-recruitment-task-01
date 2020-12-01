import { createUseStyle } from '@src/config/theme';
import React from 'react';
import { Card } from './card';

export function ErrorBox(props: { title?: string; message: string }) {
  const { styles } = useStyle();

  return (
    <Card.Wrapper style={styles.container}>
      <Card.Content title={props.title} titleStyle={styles.errorTitle}>
        <div style={styles.errorMessage}>{props.message}</div>
      </Card.Content>
    </Card.Wrapper>
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => ({
  container: {
    backgroundColor: theme.active.error.main,
  },
  errorTitle: {
    color: theme.active.error.contrast.strong,
  },
  errorMessage: {
    color: theme.active.error.contrast.weak,
  },
}));
