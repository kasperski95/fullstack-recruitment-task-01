import { TextField as MUITextField } from '@material-ui/core';
import { createUseStyle } from '@src/config/theme';
import React from 'react';

export interface TextFieldProps<T> {
  value: T | undefined;
  label: string;
  multiline?: boolean;
  obscure?: boolean;
  mapValueToString?: (value: T | undefined) => string;
  onChange?: (value: string) => void;
}

export function TextField<T>(props: TextFieldProps<T>) {
  const { styles } = useStyle();

  // fixes cursor being at the end all the time
  const [localValue, setLocalValue] = React.useState(
    props.mapValueToString
      ? props.mapValueToString(props.value)
      : ((props.value || '') as string)
  );

  return (
    <MUITextField
      style={styles.container}
      value={localValue}
      label={props.label}
      autoComplete='none'
      multiline={props.multiline}
      type={props.obscure ? 'password' : undefined}
      onChange={(e) => {
        setLocalValue(e.target.value);
        if (props.onChange) props.onChange(e.target.value);
      }}
    />
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => ({
  container: {
    marginBottom: dimensions.gutterLarge,
  },
}));
