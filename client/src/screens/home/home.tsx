import { UserEvents, UserPrivileges, useUserBloc } from '@src/blocs/user';
import { MainTemplate } from '@src/components/templates/main-template';
import { routes } from '@src/config/routes';
import { createUseStyle } from '@src/config/theme';
import React from 'react';
import { useHistory } from 'react-router-dom';

export function Home() {
  const { styles } = useStyle();
  const history = useHistory();
  const userBloc = useUserBloc();

  return (
    <MainTemplate
      title={() => {
        return (
          <div style={styles.titleWrapper}>
            {/* <div style={styles.logo} /> */}
            Home
          </div>
        );
      }}
      actions={[
        !!userBloc.user
          ? {
              label: `Log Out (${userBloc.user.username})`,
              onClick: () => {
                userBloc.dispatch(new UserEvents.Logout());
              },
            }
          : undefined,
        userBloc.isAuthorized(UserPrivileges.seeRegistration)
          ? {
              label: 'Register',
              onClick: () => {
                history.push(routes.register);
              },
            }
          : undefined,
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
      Hello there!
    </MainTemplate>
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => ({
  stepper: {
    marginBottom: dimensions.gutterMedium,
  },

  get logo() {
    return {
      width: 48,
      height: dimensions.appBarHeight,
      marginRight: dimensions.gutterMedium,
      // backgroundImage: `url(/assets/images/logo--${
      //   Color(theme.active.contrast.light).isLight() ? 'light' : 'dark'
      // }.png)`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'left center',
      display: 'inline-block',
    };
  },

  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
}));
