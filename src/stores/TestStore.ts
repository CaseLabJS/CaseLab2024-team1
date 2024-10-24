import { makeAutoObservable } from "mobx";

class TestStore {
    count: number = 0;

    constructor() {
        makeAutoObservable(this);
    }

    increment() {
        this.count += 1;
    }
}

const testStore = new TestStore();
export default testStore;