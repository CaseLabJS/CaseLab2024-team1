import { makeAutoObservable } from "mobx";

class UIStore {
    constructor() {
        makeAutoObservable(this);
    }
}

const uiStore = new UIStore();
export default uiStore;