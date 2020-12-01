import { User, UserRoles } from '@src/models/user';
import { Bloc } from '@src/modules/react-bloc';
import * as UserEvents from './user-event';
import { UserPrivileges } from './user-privileges';
import * as UserStates from './user-state';

export class UserBloc extends Bloc<UserEvents.UserEvent, UserStates.UserState> {
  constructor(private authenticate: (jwt: string) => Promise<User | null>) {
    super(new UserStates.Identifying());
  }

  public jwt: string | null = null;
  public user: User | null = null;

  isAuthorized(privilege: UserPrivileges) {
    switch (this.user?.role) {
      case UserRoles.default:
        return ([] as UserPrivileges[]).includes(privilege);
      default:
        //guest
        return [
          UserPrivileges.seeLogin,
          UserPrivileges.seeRegistration,
        ].includes(privilege);
    }
  }

  async *mapEventToState(event: UserEvents.UserEvent) {
    if (event instanceof UserEvents.Init) {
      this.jwt = localStorage.getItem('jwt');
      if (this.jwt) this.dispatch(new UserEvents.Change(this.jwt));
      else yield new UserStates.Guest();
    } else if (event instanceof UserEvents.Change) {
      localStorage.setItem('jwt', event.jwt);
      this.jwt = event.jwt;
      if (this.jwt) {
        try {
          this.user = await this.authenticate(this.jwt);
          switch (this.user!.role) {
            case UserRoles.default:
              yield new UserStates.Default(this.user!, this.jwt);
              break;
            default:
              throw new Error('Unhandled role');
          }
        } catch (err) {
          console.error(err.message);
          yield new UserStates.Guest();
        }
      } else {
        yield new UserStates.Guest();
      }
    } else if (event instanceof UserEvents.Logout) {
      localStorage.removeItem('jwt');
      this.jwt = null;
      this.user = null;
      yield new UserStates.Guest();
    }
  }
}
