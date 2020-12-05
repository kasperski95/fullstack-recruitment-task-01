import { FormBloc, FormEvents, FormStates } from '@src/blocs/form';
import { Card } from '@src/components/card';
import { createUseStyle } from '@src/config/theme';
import { combine } from '@src/modules/css-in-jsx';
import { BlocBuilder } from '@src/modules/react-bloc';
import React from 'react';
import { Button } from '../buttons';

export function FormWrapper<T, R>(props: {
  children: React.ReactNode;
  formBloc: FormBloc<T, R>;
  submitLabel?: string;
  style?: React.CSSProperties;
}) {
  const { styles } = useStyle();

  return (
    <Card.Wrapper style={combine([styles.container, props.style])}>
      {props.children}
      <div style={styles.buttonWrapper}>
        <BlocBuilder
          bloc={props.formBloc}
          builder={(state) => {
            const disabled = state instanceof FormStates.Sending;

            return (
              <Button.Submit
                label={props.submitLabel || 'Submit'}
                onClick={
                  disabled
                    ? undefined
                    : () => {
                        props.formBloc.dispatch(new FormEvents.Submit());
                      }
                }
              />
            );
          }}
        />
      </div>
    </Card.Wrapper>
  );
}
const useStyle = createUseStyle(({ theme, dimensions, shared }) => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      padding: dimensions.gutterMedium,
    },
    buttonWrapper: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
  };
});
