import {action, makeObservable, observable} from "mobx";

class NotificationStore {
    @observable showNotification: boolean = false;
    @observable message: string = "";

    constructor() {
        makeObservable(this); // Make sure observables and actions are recognized
    }

    @action // The @action decorator marks functions as actions that modify observable state
    success(message: string) {
        this.message = message;
        this.updateNotification();
    }

    @action // The @action decorator marks functions as actions that modify observable state
    error(message: string) {
        this.showNotification = true;
        this.message = message;
        setTimeout(() => {
            this.message = "";
            this.showNotification = false;
        }, 3000)
    }

    @action
    close() {
        this.showNotification = false;
    }

    private updateNotification() {
        this.showNotification = true;
        setTimeout(() => {
            this.message = "";
            this.showNotification = false;
        }, 3000)
    }
}

export default new NotificationStore();