import {action, makeAutoObservable, observable} from "mobx";
import Keycloak from "keycloak-js";
import keycloak from "../security/keycloak.ts";

export interface Purchase {
    amount: number;
    createdAt: string;
}

class ReportStore {
    private keycloak: Keycloak;
    @observable purchaseReports: Purchase[] = [];

    constructor() {
        this.keycloak = keycloak;
        makeAutoObservable(this);
    }

    @action public async getReports() {
        const url = "http://localhost:8080/api/reports";
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.keycloak.token}`,  // Bearer token
            }
        });
        this.purchaseReports = await response.json();
    }
}

export default new ReportStore();