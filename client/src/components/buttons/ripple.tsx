import { ButtonBase } from '@material-ui/core';
import { createUseStyle } from '@src/config/theme';
import { combine } from '@src/modules/css-in-jsx';
import React from 'react';

export function Ripple(props: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onMouseOver?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onMouseOut?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {
  const { theme } = useStyle();

  return (
    <ButtonBase
      style={combine([{ color: theme.active.contrast.main }, props.style])}
      onClick={props.onClick}
      onMouseOver={props.onMouseOver}
      onMouseOut={props.onMouseOut}
      disabled={!props.onClick}
    >
      {props.children}
    </ButtonBase>
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => {
  return {
    container: {},
  };
});
