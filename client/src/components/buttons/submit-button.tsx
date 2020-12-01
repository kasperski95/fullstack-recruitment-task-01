import { createUseStyle, ThemeProvider } from '@src/config/theme';
import { combine } from '@src/modules/css-in-jsx';
import React from 'react';
import { Ripple } from './ripple';
import { ButtonProps } from './types';

export function SubmitButton(props: ButtonProps) {
  const { styles, theme } = useStyle('clickable');

  return (
    <ThemeProvider theme={theme}>
      <Ripple style={combine([styles.ripple])} onClick={props.onClick}>
        <div style={styles.button(!props.onClick)}>{props.label}</div>
      </Ripple>
    </ThemeProvider>
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => ({
  ripple: {
    color: theme.clickable.contrast.main,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.clickable.main,
    borderRadius: dimensions.radiusSmall,
    overflow: 'hidden',
  },

  button: (disabled: boolean) => ({
    ...shared.typography.submit,
    padding: dimensions.gutterLarge,
    paddingTop: dimensions.gutterMedium,
    paddingBottom: dimensions.gutterMedium,
    backgroundColor: disabled ? theme.active.weak : theme.active.strong,
  }),
}));
