import { createUseStyle, ThemeProvider } from '@src/config/theme';
import { combine } from '@src/modules/css-in-jsx';
import React from 'react';

export function CardWrapper(props: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const { styles, theme } = useStyle();

  return (
    <ThemeProvider theme={theme}>
      <div style={combine([styles.container, props.style])}>
        {props.children}
      </div>
    </ThemeProvider>
  );
}

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
