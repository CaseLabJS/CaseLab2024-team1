import { User } from './User/User';

// POST /sign/send  | GET /sign/{id}  | GET /sign (Sign[])
export type Sign = {
  id: number;
  userTo: User;
  documentVersionId: number;
};
