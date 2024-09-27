import {action, makeAutoObservable, observable} from "mobx";
import Keycloak from "keycloak-js";
import keycloak from "../security/keycloak.ts";

interface IPaymentMethod {
    id: number;
    cardDetail: IPaymentCard;

}

interface IPaymentCard {
    cardNumber: number;
    expiryYear: number;
    expiryMonth: number;
}

class PaymentMethodsStore {
    private keycloak: Keycloak;
    @observable paymentMethods: IPaymentMethod[] = new Array<IPaymentMethod>();

    constructor() {
        this.keycloak = keycloak;
        makeAutoObservable(this); // Make sure observables and actions are recognized
    }

    @action public async getMyPaymentMethods() {
        const url = "http://localhost:8080/api/payment/payment-method";
        this.paymentMethods = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.keycloak.token}`,  // Bearer token
            }
        }).then(response => response.json());
    }
}

export default new PaymentMethodsStore();