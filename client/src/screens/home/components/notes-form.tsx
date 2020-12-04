import { useFormBloc } from '@src/blocs/form';
import { Form, FormField } from '@src/components/form';
import { useI18n } from '@src/config/configure-i18n';
import { useAppReducer } from '@src/config/configure-store';
import React from 'react';

export function NotesForm() {
  const { translations } = useI18n();
  const { dispatch } = useAppReducer();

  const formBloc = useFormBloc(
    'home',
    {
      content: '',
    },
    {
      onSubmit: (formData) => {
        dispatch({ type: 'addNote', payload: formData });
      },
    }
  );

  return (
    <Form.Wrapper formBloc={formBloc} submitLabel={translations.home.addNote}>
      <Form.Builder
        formBloc={formBloc}
        builder={(data, createFormFieldProps) => {
          return (
            <React.Fragment>
              <FormField.Text
                label={translations.home.note}
                {...createFormFieldProps('content')}
              />
            </React.Fragment>
          );
        }}
      />
    </Form.Wrapper>
  );
}
