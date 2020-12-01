import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { ThemeEvents, useThemeBloc } from '@src/blocs/theme';
import { createUseStyle } from '@src/config/theme';
import React from 'react';
import { Button } from '../buttons';

interface Action {
  label: string;
  onClick?: () => void;
}

export interface AppBarProps {
  title: string | (() => React.ReactChild);
  showBackArrow?: boolean;
  onGoBack?: () => void;
  actions?: (Action | undefined)[];
}

export function AppBar(props: AppBarProps) {
  const { styles } = useStyle();
  const themeBloc = useThemeBloc();

  const shouldRenderActions = !!props.actions;

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.titleWrapper}>
          {props.showBackArrow && (
            <Button.Icon
              rippleStyle={styles.iconButton}
              onClick={props.onGoBack}
            >
              <ArrowBackIcon style={styles.arrow} />
            </Button.Icon>
          )}
          <div style={styles.title}>
            {props.title instanceof Function ? props.title() : props.title}
          </div>
        </div>
        <div style={styles.gutter} />
        {shouldRenderActions && (
          <React.Fragment>
            {props.actions
              ?.filter((el) => !!el)
              .map((action) => {
                return (
                  <Button.Flat
                    key={action!.label}
                    label={action!.label}
                    onClick={action!.onClick}
                  />
                );
              })}
          </React.Fragment>
        )}
        <div style={styles.toggleThemeBtn}>
          <Button.Icon
            onClick={() => {
              themeBloc.dispatch(new ThemeEvents.Toggle());
            }}
          >
            {themeBloc.isDarkTheme() ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </Button.Icon>
        </div>
      </div>
    </div>
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => ({
  container: {
    ...shared.shadow,
    width: '100%',
    height: dimensions.appBarHeight,
    backgroundColor: theme.active.strong,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: dimensions.appBarIndex,
  },
  content: {
    width: '100%',
    maxWidth: dimensions.widthLimiter,
    marginLeft: dimensions.gutterMedium,
    display: 'flex',
  },
  titleWrapper: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  title: {
    ...shared.typography.title,
    marginBottom: 3,
  },
  iconButton: {
    marginLeft: -dimensions.gutterMedium,
  },
  arrow: {
    width: '100%',
    height: '100%',
  },
  gutter: {
    flex: 1,
    minWidth: dimensions.gutterMedium,
  },
  toggleThemeBtn: {
    display: 'flex',
    alignItems: 'center',
  },
}));
