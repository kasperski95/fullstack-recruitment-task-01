export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: UserRoles;
}

export enum UserRoles {
  default = 'default',
}
