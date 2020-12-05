import { createUseStyle } from '@src/config/theme';
import { combine } from '@src/modules/css-in-jsx';
import React from 'react';
import { Button } from '../buttons';

export function CardContent(props: {
  title?: string | (() => JSX.Element);
  titleStyle?: React.CSSProperties;
  actions?: { label: string; onClick?: () => void }[];
  children: React.ReactChild | React.ReactChild[];
}) {
  const { styles } = useStyle();

  const shouldRenderTitle = !!props.title;
  const shouldRenderActions = !!props.actions;

  return (
    <div style={styles.container}>
      {shouldRenderTitle && (
        <div style={combine([styles.title, props.titleStyle])}>
          {props.title instanceof Function ? props.title() : props.title}
        </div>
      )}
      <div>{props.children}</div>
      {shouldRenderActions && (
        <React.Fragment>
          <div style={styles.actionGutter} />
          <div style={styles.actionWrapper}>
            {props.actions!.map((action) => {
              return (
                <Button.Flat
                  key={action.label}
                  label={action.label}
                  onClick={action.onClick}
                />
              );
            })}
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => {
  return {
    container: {
      ...shared.typography.default,
      margin: dimensions.gutterMedium,
    },

    title: shared.typography.h1,

    actionWrapper: {
      borderTopWidth: 1,
      borderTopStyle: 'solid',
      borderTopColor: theme.active.main,
      margin: -dimensions.gutterMedium,
      marginTop: 0,
    },

    actionGutter: {
      marginTop: dimensions.gutterMedium,
    },
  };
});
