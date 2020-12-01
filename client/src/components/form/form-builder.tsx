import { FormBloc, FormStates } from '@src/blocs/form';
import { BlocBuilder } from '@src/modules/react-bloc';
import React from 'react';
import { ErrorBox } from '../error-box';

interface SharedFormFieldProps<T, R> {
  id: keyof T;
  key: keyof T;
  bloc: FormBloc<T, R>;
  value: any;
}

export function FormBuilder<T, R>(props: {
  formBloc: FormBloc<T, R>;
  builder: (
    data: T,
    createFormFieldProps: (id: keyof T) => SharedFormFieldProps<T, R>,
    isSending: boolean
  ) => JSX.Element;
}) {
  return (
    <BlocBuilder
      bloc={props.formBloc}
      builder={(state) => {
        if (state instanceof FormStates.Editable) {
          return props.builder(
            state.data,
            (id: keyof T) => ({
              id,
              key: id,
              value: props.formBloc.getValue(id),
              bloc: props.formBloc,
            }),
            false
          );
        } else if (state instanceof FormStates.ServerError) {
          return (
            <React.Fragment>
              <ErrorBox message={state.message} />
              {props.builder(
                state.data,
                (id: keyof T) => ({
                  id,
                  key: id,
                  value: props.formBloc.getValue(id),
                  bloc: props.formBloc,
                }),
                false
              )}
            </React.Fragment>
          );
        } else if (state instanceof FormStates.Sending) {
          return props.builder(
            state.data,
            (id: keyof T) => ({
              id,
              key: id,
              value: props.formBloc.getValue(id),
              bloc: props.formBloc,
            }),
            true
          );
        }
        return <React.Fragment />;
      }}
    />
  );
}
