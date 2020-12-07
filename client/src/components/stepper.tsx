import { createUseStyle } from '@src/config/theme';
import { combine } from '@src/modules/css-in-jsx';
import { throttle } from 'lodash';
import React from 'react';

export function Stepper(props: {
  steps: {
    label: string;
    renderer?: (() => React.ReactNode) | React.ReactNode;
    onClick?: (index: number) => void;
  }[];
  activeIndex: number;
  style?: React.CSSProperties;
}) {
  const { styles, dimensions } = useStyle();
  const [labelsHidden, setLabelsHidden] = React.useState(
    window.innerWidth < dimensions.breakpointSmall
  );

  const handleResize = React.useCallback(() => {
    setLabelsHidden(window.innerWidth < dimensions.breakpointSmall);
  }, [setLabelsHidden, dimensions.breakpointSmall]);

  React.useEffect(() => {
    const throttledHandler = throttle(handleResize, 200);
    window.addEventListener('resize', throttledHandler);
    return () => {
      window.removeEventListener('resize', throttledHandler);
      throttledHandler.cancel();
    };
  }, []);

  const renderer = props.steps[props.activeIndex].renderer;
  const shouldRenderBody = !!renderer;
  const children = renderer instanceof Function ? renderer() : renderer;
  return (
    <React.Fragment>
      <div style={combine([styles.container, props.style])}>
        {props.steps.map((step, index) => {
          const isActive = index === props.activeIndex;
          const isClickable = index < props.activeIndex && !!step.onClick;
          return (
            <div
              key={step.label}
              style={styles.stepWrapper(isClickable)}
              onClick={isClickable ? () => step.onClick!(index) : undefined}
            >
              <div style={styles.circle(isActive, isClickable)}>
                {index + 1}
              </div>
              {(!labelsHidden || isActive) && (
                <div style={styles.label(isActive, isClickable)}>
                  {step.label}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {shouldRenderBody && children}
    </React.Fragment>
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  stepWrapper: (clickable: boolean) => ({
    display: 'inline-block',
    cursor: clickable ? 'pointer' : 'default',
  }),
  circle: (active: boolean, clickable: boolean) => ({
    ...shared.typography.h2,
    display: 'inline-flex',
    width: 28,
    height: 28,
    borderWidth: 2,
    borderColor: active
      ? theme.accent.main
      : clickable
      ? theme.clickable.main
      : theme.active.contrast.weak,
    color: active
      ? theme.accent.main
      : clickable
      ? theme.clickable.main
      : theme.active.contrast.weak,
    borderStyle: 'solid',
    borderRadius: '100%',
    lineHeight: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: dimensions.gutterSmall,
    marginRight: dimensions.gutterSmall,
  }),
  label: (active: boolean, clickable: boolean) => ({
    ...shared.typography.h2,
    color: active
      ? theme.accent.main
      : clickable
      ? theme.clickable.main
      : theme.active.contrast.weak,
    userSelect: 'none',
    display: 'inline-flex',
  }),
}));
