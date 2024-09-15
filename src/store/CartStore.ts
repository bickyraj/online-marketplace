import {action, computed, makeObservable, observable} from "mobx";
import ProductEntity from "../components/entity/ProductEntity.tsx";
import StorageUtil from "../utils/StorageUtil.ts";

class CartStore {
    private static STORAGE_KEY = 'cartProducts';

    @observable cartProducts: ProductEntity[] = [];

    constructor() {
        makeObservable(this); // Make sure observables and actions are recognized
        this.load();
    }

    @computed get itemCount() {
        return this.cartProducts.length;
    }

    @action // The @action decorator marks functions as actions that modify observable state
    addItem(item: ProductEntity) {
        this.cartProducts.push(item);
        this.save();
    }

    @action
    removeItem(item: ProductEntity) {
        const itemIndex = this.cartProducts.findIndex(value => {
            return value.id == item.id;
        });
        if (itemIndex >= 0) {
            this.cartProducts.splice(itemIndex, 1);
            this.save();
        }
    }

    productIsInCart(product: ProductEntity): boolean {
        return this.cartProducts.findIndex(item => item.id == product.id) !== -1;
    }

    private save() {
        StorageUtil.save(CartStore.STORAGE_KEY, this.cartProducts);
    }

    private load() {
        const savedCart = StorageUtil.load<ProductEntity[]>(CartStore.STORAGE_KEY);
        if (savedCart) {
            this.cartProducts = savedCart;
        }
    }
}

export default new CartStore();