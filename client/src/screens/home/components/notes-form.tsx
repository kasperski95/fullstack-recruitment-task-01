import { FormEvents, useFormBloc } from '@src/blocs/form';
import { Form, FormField } from '@src/components/form';
import { useI18n } from '@src/config/configure-i18n';
import { withStore } from '@src/config/configure-store';
import React from 'react';

interface NotesFormProps {}

interface NotesFormStoreProps {
  actions: { addNote: (noteContent: string) => void };
}

function _NotesForm(props: NotesFormProps & NotesFormStoreProps) {
  const { translations } = useI18n();

  const formBloc = useFormBloc(
    'home',
    {
      content: '',
    },
    {
      onSubmit: (formData) => {
        if (formData.content) {
          props.actions.addNote(formData.content);
          formBloc.dispatch(new FormEvents.Reset());
        }
      },
    }
  );

  return (
    <div id='notes-form-wrapper'>
      <Form.Wrapper formBloc={formBloc} submitLabel={translations.home.addNote}>
        <Form.Builder
          formBloc={formBloc}
          builder={(data, createFormFieldProps) => {
            return (
              <React.Fragment>
                <FormField.Text
                  label={translations.home.note}
                  required={true}
                  {...createFormFieldProps('content')}
                />
              </React.Fragment>
            );
          }}
        />
      </Form.Wrapper>
    </div>
  );
}

export const NotesForm = withStore<NotesFormProps, NotesFormStoreProps>(
  _NotesForm,
  (state, dispatch) => {
    return {
      actions: {
        addNote: (noteContent) => {
          dispatch('addNote')({ content: noteContent });
        },
      },
    };
  }
);
