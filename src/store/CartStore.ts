import {action, makeObservable, observable} from "mobx";
import ProductEntity from "../components/entity/ProductEntity.tsx";

class CartStore {
    @observable cartProducts: ProductEntity[] = []; // Using the @observable decorator

    constructor() {
        makeObservable(this); // Make sure observables and actions are recognized
    }

    @action // The @action decorator marks functions as actions that modify observable state
    addItem(item: ProductEntity) {
        this.cartProducts.push(item);
    }

    @action
    removeItem(item: ProductEntity) {
        const itemIndex = this.cartProducts.findIndex(value => {
            return value.id == item.id;
        });
        if (itemIndex >= 0) {
            this.cartProducts.splice(itemIndex, 1);
            console.log(this.cartProducts);
        }
    }
}

export default new CartStore();