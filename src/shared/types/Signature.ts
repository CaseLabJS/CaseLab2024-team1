// signature-controller

import { User } from './User/User';

// POST /sign/{id}
export type Signature = {
  hash: number;
  placeholderTitle: string;
  user: User;
};
