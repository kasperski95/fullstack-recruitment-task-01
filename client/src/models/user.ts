export interface User {
  id: string;
  email: string;
  password: string;
  role: UserRoles;
}

export enum UserRoles {
  default = 'default',
}
