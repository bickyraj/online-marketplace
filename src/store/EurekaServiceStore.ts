import {action, makeAutoObservable, observable} from "mobx";

export interface Application {
    instance: ApplicationInstance[];
    name: string;
}
export interface ApplicationInstance {
    instanceId: string;
    hostName: string;
    app: string;
    ipAddr: string;
    status: string;
}

class EurekaServiceStore {
    @observable applicationServices: Application[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    @action public async getMyPaymentMethods() {
        const url = "http://localhost:8761/eureka/apps";
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });
        const data = await response.json();
        this.applicationServices = data?.applications?.application;
        this.applicationServices.sort((a, b) => a.name.localeCompare(b.name));
    }
}

export default new EurekaServiceStore();