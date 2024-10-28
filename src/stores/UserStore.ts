import { User } from '@/shared/types/sharedTypes';
import { makeAutoObservable } from 'mobx';
class UserStore {
  users: User[] = [];
  currentUser: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  login() {}

  addUser() {}
}

const userStore = new UserStore();
export default userStore;
