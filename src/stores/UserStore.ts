import { makeAutoObservable } from "mobx";

interface User {
        
}

class UserStore {
    users: User[] = [];
    currentUser: User | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    login() {

    }

    addUser() {

    }
}

const userStore = new UserStore();
export default userStore;