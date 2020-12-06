import { FormEvents, useFormBloc } from '@src/blocs/form';
import { Form, FormField } from '@src/components/form';
import { useConnection } from '@src/config/configure-connection-utils';
import { useI18n } from '@src/config/configure-i18n';
import { withStore } from '@src/config/configure-store';
import { addNoteMutation } from '@src/gql/add-note-mutation';
import { Note } from '@src/models/note';
import React from 'react';

interface NotesFormProps {}

interface NotesFormStoreProps {
  actions: {
    addNote: (note: Note) => void;
  };
}

function _NotesForm(props: NotesFormProps & NotesFormStoreProps) {
  const { translations } = useI18n();
  const { gql } = useConnection();

  const formBloc = useFormBloc(
    'home',
    {
      content: '',
    },
    {
      onSubmit: async (formData) => {
        if (formData.content) {
          const note = (await gql(addNoteMutation({ data: formData }))) as Note;
          props.actions.addNote(note);
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
        addNote: (note) => {
          dispatch('addNote')({ note });
        },
      },
    };
  }
);
