import { createUseStyle, ThemeProvider } from '@src/config/theme';
import React from 'react';
import { Ripple } from './ripple';
import { ButtonProps } from './types';

export function FlatButton(props: ButtonProps) {
  const { theme, styles } = useStyle('clickable');

  return (
    <ThemeProvider theme={theme}>
      <Ripple
        onClick={props.onClick}
        style={{ color: theme.active.main, ...styles.ripple }}
      >
        <div style={styles.button(!props.onClick)}>{props.label}</div>
      </Ripple>
    </ThemeProvider>
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => {
  return {
    ripple: {
      borderRadius: dimensions.radiusSmall,
    },

    button: (disabled: boolean) => ({
      padding: dimensions.gutterSmall,
      paddingLeft: dimensions.gutterMedium,
      paddingRight: dimensions.gutterMedium,
      overflow: 'hidden',
      ...shared.typography.action(disabled),
    }),
  };
});
