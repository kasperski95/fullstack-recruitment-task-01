import { TextField } from '@material-ui/core';
import { FormBloc, FormEvents } from '@src/blocs/form';
import { createUseStyle } from '@src/config/theme';
import React from 'react';

export function TextFormField<T, R>(props: {
  id: keyof T;
  value: T[keyof T] | undefined;
  bloc: FormBloc<T, R>;
  label: string;
  obscure?: boolean;
  mapValueToString?: (value: T[keyof T] | undefined) => string;
}) {
  const { styles } = useStyle();

  // fixes cursor being at the end all the time
  const [localValue, setLocalValue] = React.useState(
    props.mapValueToString
      ? props.mapValueToString(props.value)
      : ((props.value || '') as string)
  );

  return (
    <TextField
      style={styles.container}
      value={localValue}
      label={props.label}
      autoComplete='none'
      type={props.obscure ? 'password' : undefined}
      onChange={(e) => {
        setLocalValue(e.target.value);
        props.bloc.dispatch(new FormEvents.Update<T>(props.id, e.target.value));
      }}
    />
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => ({
  container: {
    marginBottom: dimensions.gutterLarge,
  },
}));
