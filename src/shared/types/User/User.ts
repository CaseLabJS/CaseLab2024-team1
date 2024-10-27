import { Role } from './Role';

// user-controller
export type User = {
  id: number;
  name: string;
  surname: string;
  email: string;
  roles: Role[];
};
