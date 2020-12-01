import { useFormBloc } from '@src/blocs/form';
import { UserPrivileges, useUserBloc } from '@src/blocs/user';
import { Form, FormField } from '@src/components/form';
import { MainTemplate } from '@src/components/templates/main-template';
import { useConnection } from '@src/config/configure-connection-utils';
import { routes } from '@src/config/routes';
import { createUseStyle } from '@src/config/theme';
import { createUser } from '@src/gql/create-user';
import React from 'react';
import { useHistory } from 'react-router-dom';

export function RegistrationScreen() {
  const { styles } = useStyle();
  const history = useHistory();
  const userBloc = useUserBloc();
  const { gql } = useConnection();
  const formBloc = useFormBloc(
    'register',
    {
      email: '',
      password: '',
    },
    {
      onSubmit: async (data) => {
        return gql(createUser({ data }));
      },
      onSuccess: () => {
        history.push(routes.login);
      },
    }
  );

  return (
    <MainTemplate
      style={styles.container}
      title='Register'
      showBackArrow={true}
      actions={[
        userBloc.isAuthorized(UserPrivileges.seeLogin)
          ? {
              label: 'Log In',
              onClick: () => {
                history.push(routes.login);
              },
            }
          : undefined,
      ]}
    >
      <Form.Wrapper style={styles.form} formBloc={formBloc}>
        <Form.Builder
          formBloc={formBloc}
          builder={(_, createFormFieldProps) => {
            return (
              <React.Fragment>
                <FormField.Text
                  {...createFormFieldProps('email')}
                  label='E-mail'
                />
                <FormField.Text
                  {...createFormFieldProps('password')}
                  label='Password'
                  obscure={true}
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
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  form: {
    maxWidth: 500,
  },
}));
