import { routes } from '@src/config/routes';
import { createUseStyle } from '@src/config/theme';
import { combine } from '@src/modules/css-in-jsx';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { AppBar } from '../app-bar';
import { AppBarProps } from '../app-bar/app-bar';

interface TemplateProps extends AppBarProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function MainTemplate(props: TemplateProps) {
  const { styles } = useStyle();
  const history = useHistory();

  return (
    <React.Fragment>
      <AppBar
        title={props.title}
        actions={props.actions}
        showBackArrow={props.showBackArrow}
        onGoBack={
          props.onGoBack ||
          (() => {
            history.push(routes.home);
          })
        }
      />
      <div style={combine([styles.contentWrapper])}>
        <div style={combine([styles.content, props.style])}>
          {props.children}
        </div>
      </div>
    </React.Fragment>
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => ({
  contentWrapper: {
    display: 'flex',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    marginTop: dimensions.gutterMedium,
    paddingLeft: dimensions.gutterMedium,
    paddingRight: dimensions.gutterMedium,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    maxWidth: dimensions.widthLimiter,
  },
}));
