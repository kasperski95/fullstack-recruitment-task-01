import { createUseStyle, ThemeProvider } from '@src/config/theme';
import { combine } from '@src/modules/css-in-jsx';
import React from 'react';
import { Ripple } from './ripple';

export function IconButton(props: {
  children: React.ReactNode;
  rippleStyle?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {
  const { theme, styles } = useStyle('clickable');

  return (
    <ThemeProvider theme={theme}>
      <Ripple
        onClick={props.onClick}
        style={combine([
          { color: theme.active.main },
          styles.ripple,
          props.rippleStyle,
        ])}
      >
        <div style={combine([styles.button(!props.onClick)])}>
          {props.children}
        </div>
      </Ripple>
    </ThemeProvider>
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => {
  return {
    ripple: {
      borderRadius: '100%',
    },

    button: (disabled: boolean) => ({
      width: 48,
      height: 48,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: dimensions.gutterSmall,
      overflow: 'hidden',
      color: disabled ? theme.clickable.weak : theme.clickable.strong,
    }),
  };
});
