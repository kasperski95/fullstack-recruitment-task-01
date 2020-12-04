import { useFormBloc } from '@src/blocs/form';
import { Form, FormField } from '@src/components/form';
import { MainTemplate } from '@src/components/templates/main-template';
import { useI18n } from '@src/config/create-i18n-context';
import { createUseStyle } from '@src/config/theme';
import React from 'react';

export function Home() {
  const { styles } = useStyle();
  const { translations } = useI18n();

  const formBloc = useFormBloc('home', {
    content: '',
  });

  return (
    <MainTemplate
      title={() => {
        return <div style={styles.titleWrapper}>{translations.title}</div>;
      }}
    >
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
    </MainTemplate>
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => ({
  stepper: {
    marginBottom: dimensions.gutterMedium,
  },

  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
}));
