import { FormBloc, FormEvents } from '@src/blocs/form';
import React from 'react';
import { TextField, TextFieldProps } from './text-field';

export interface TextFormFieldProps<T, R, K extends keyof T>
  extends TextFieldProps<T[K]> {
  id: K;
  bloc: FormBloc<T, R>;
}

export function TextFormField<T, R, K extends keyof T>(
  props: TextFormFieldProps<T, R, K>
) {
  const { ...otherProps } = props;

  return (
    <TextField
      {...otherProps}
      multiline={true}
      onChange={(value) => {
        props.bloc.dispatch(new FormEvents.Update<T>(props.id, value));
      }}
    />
  );
}
