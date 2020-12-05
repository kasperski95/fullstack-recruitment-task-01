import { routes } from '@src/config/routes';
import { createUseStyle } from '@src/config/theme';
import { combine } from '@src/modules/css-in-jsx';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { AppBar } from '../app-bar';
import { AppBarProps } from '../app-bar/app-bar';
import { Card } from '../card';

interface TemplateProps extends AppBarProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  modal?: {
    component: React.ReactNode;
    onGoBack: () => void;
  };
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

      {props.modal && (
        <div
          style={styles.modal}
          onClick={(e) => {
            props.modal!.onGoBack();
          }}
        >
          <Card.Wrapper
            onClick={(e) => {
              e.stopPropagation();
            }}
            style={styles.modalContent}
          >
            {props.modal.component}
          </Card.Wrapper>
        </div>
      )}
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
  modal: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: dimensions.appBarIndex + 100,
    paddingTop: dimensions.appBarHeight + dimensions.gutterMedium,
    paddingBottom: dimensions.gutterMedium,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
  },

  modalContent: {
    maxWidth: dimensions.widthLimiter,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: shared.shadow.boxShadow,
  },
}));
