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

  // BEGIN_BUGFIX: cursor jumping to the end
  const mapValueToString = React.useCallback(
    (value: T | undefined) => {
      return props.mapValueToString
        ? props.mapValueToString(value)
        : ((value || '') as string);
    },
    [props]
  );

  const [localValue, setLocalValue] = React.useState(
    mapValueToString(props.value)
  );

  React.useEffect(() => {
    setLocalValue(mapValueToString(props.value));
  }, [props.value, mapValueToString]);
  // END_BUGFIX

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
