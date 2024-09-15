import {action, makeAutoObservable, observable} from "mobx";
import StorageUtil from "../utils/StorageUtil.ts";

class AuthUser {
    public firstName: string;
    public lastName: string;
    public email: string;
    public username: string;
    constructor(firstName: string, lastName: string, email: string, username: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.username = username;
        makeAutoObservable(this);
    }
    public static getEmptyObject(): AuthUser {
        return new AuthUser("", "", "", "");
    }
}
class UserStore {
    private static STORAGE_KEY = 'authUser';

    @observable user: AuthUser = AuthUser.getEmptyObject();

    constructor() {
        makeAutoObservable(this); // Make sure observables and actions are recognized
        this.load();
    }

    @action public setUser(firstName: string, lastName: string, email: string, username: string) {
        this.user = new AuthUser(firstName, lastName, email, username);
        this.save();
    }

    public getFirstName() {
        return this.user.firstName;
    }

    public getLastName() {
        return this.user.lastName;
    }

    public getUserName() {
        return this.user.username;
    }

    public getEmail() {
        return this.user.email;
    }
    clearUser(): void {
        this.user = AuthUser.getEmptyObject();
        this.save();
    }

    private save() {
        StorageUtil.save(UserStore.STORAGE_KEY, this.user);
    }

    private load() {
        const savedUser = StorageUtil.load<AuthUser>(UserStore.STORAGE_KEY);
        if (savedUser) {
            this.user = savedUser;
        }
    }
}

export default new UserStore();