interface OrderItem {
    id: number;
    product: Product;
}

interface Product {
    id: number;
    name: string;
    price: number;
}
class UserOrder {
    id: number | undefined;
    orderItems: OrderItem[] | undefined;
}

export default UserOrder;