import { createUseStyle, ThemeProvider } from '@src/config/theme';
import { combine } from '@src/modules/css-in-jsx';
import React from 'react';

export const CardWrapper = React.forwardRef(
  (
    props: {
      children: React.ReactNode;
      onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
      style?: React.CSSProperties;
    },
    ref?: React.ForwardedRef<HTMLDivElement>
  ) => {
    const { styles, theme } = useStyle();

    return (
      <ThemeProvider theme={theme}>
        <div
          style={combine([styles.container, props.style])}
          onClick={props.onClick}
          ref={ref}
        >
          {props.children}
        </div>
      </ThemeProvider>
    );
  }
);

const useStyle = createUseStyle(({ theme, dimensions, shared }) => {
  return {
    container: {
      width: '100%',
      backgroundColor: theme.active.light,
      // padding: dimensions.gutterMedium,
      overflow: 'hidden',
      borderRadius: dimensions.radiusSmall,
      marginBottom: dimensions.gutterMedium,
      ...shared.shadow,
    },
  };
});
