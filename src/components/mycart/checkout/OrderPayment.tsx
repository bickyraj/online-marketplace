import {observer} from "mobx-react-lite";
import cartStore from "../../../store/CartStore.ts";
import {useEffect, useState} from "react";
import {useKeycloak} from "@react-keycloak/web";
import notificationStore from "../../../store/NotificationStore.ts";
import {useNavigate} from "react-router-dom";

interface IPaymentMethod {
    id: number;
    cardDetail: IPaymentCard;

}

interface IPaymentCard {
    cardNumber: number;
    expiryYear: number;
    expiryMonth: number;
}

const OrderPayment: React.FC = () => {
    const {keycloak} = useKeycloak();
    const navigate = useNavigate();
    const [paymentMethods, setPaymentMethods] = useState<IPaymentMethod[]>([]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<number>();
    useEffect(() => {
        fetchPaymentMethods();
    }, []);

    const handlePaymentMethodSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPaymentMethod(parseInt(event.target.value)); // Update the state with the selected value
    };

    const placeOrder = async() => {
        const url = "http://localhost:8080/api/orders/create";
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${keycloak.token}`,
            },
            body: JSON.stringify({
                orderItems: cartStore.cartProducts.map((item) => {
                    return {
                        productId: item.id,
                        quantity: 1
                    }
                }),
                paymentMethodId: selectedPaymentMethod})
        }).then(response => response.json());
        if (response) {
            notificationStore.success("payment successful");
            cartStore.clearCart();
            setTimeout(() => {
                navigate("/admin/payment-successful");
            }, 1000)
        }
    }


    const fetchPaymentMethods = async () => {
        const url = "http://localhost:8080/api/payment/payment-method";
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${keycloak.token}`,  // Bearer token
            }
        }).then(response => response.json());
        setPaymentMethods(response);
    }

    return (
        <div>
            <div className="px-4 sm:px-0 pt-10">
                <h3 className="text-base font-semibold leading-7 text-gray-900">Billing</h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p>
            </div>
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-xl font-semibold leading-6 text-gray-900">Product</dt>
                        <dd className="mt-1 text-xl font-semibold leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Amount</dd>
                    </div>
                    {cartStore.cartProducts.map((product, index) => (
                        <div key={index} className="px-4 py-6 pb-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">{product.name}</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">${product.price}</dd>
                        </div>
                    ))}
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-xl font-bold leading-6 text-gray-900">Total</dt>
                        <dd className="mt-1 text-xl leading-6 font-bold text-gray-700 sm:col-span-2 sm:mt-0">${cartStore.total}</dd>
                    </div>
                </dl>
            </div>
            <div className="mt-10 pt-4 mb-8 border-t border-gray-100">
                <legend className="text-lg font-semibold leading-6 text-gray-900">Payment</legend>
                <p className="mt-1 text-sm leading-6 text-gray-600">Select you payment method</p>
                <div className="mt-6 space-y-6">
                    <div className="flex items-center gap-x-3">
                        <input
                            id="push-everything"
                            name="payment-type"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                            <img src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png"
                                 className="h-8" alt="test"/>
                        </label>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <input
                            id="push-email"
                            name="payment-type"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                            <img src="https://www.sketchappsources.com/resources/source-image/PayPalCard.png"
                                 className="h-8" alt="test"/>
                        </label>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-100 pt-10 mt-6 mb-8 space-y-6">
                {paymentMethods.length > 0 && (
                    paymentMethods.map((paymentMethod: IPaymentMethod) => (
                        <div key={paymentMethod.id} className="flex items-center gap-x-3">
                            <input
                                id="test"
                                value={paymentMethod.id}
                                onChange={handlePaymentMethodSelection}
                                name="payment-method"
                                type="radio"
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label htmlFor="payment-method"
                                   className="flex text-sm font-medium leading-6 text-gray-900">
                                <div className="flex items-center mr-2">
                                    **** **** **** {paymentMethod.cardDetail.cardNumber}
                                </div>
                                <span>{paymentMethod.cardDetail.expiryMonth}/{paymentMethod.cardDetail.expiryYear}</span>
                            </label>
                        </div>
                    ))
                )}
            </div>
            <div className="grid container">
                <button
                    onClick={placeOrder}
                    type="submit"
                    className="rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-800 hover:text-white shadow-sm hover:bg-green-600 transition-colors ease-linear duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Pay now
                </button>
            </div>
        </div>
    )
}

export default observer(OrderPayment);