import {observer} from "mobx-react-lite";
import cartStore from "../../../store/CartStore.ts";
import {useEffect, useState} from "react";
import {useKeycloak} from "@react-keycloak/web";
import notificationStore from "../../../store/NotificationStore.ts";
import {useNavigate} from "react-router-dom";
import {formattedPrice} from "../../../utils/PriceUtil.ts";

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
    const [paymentInProgress, setPaymentInProgress] = useState<boolean>(false);
    const [paymentMethods, setPaymentMethods] = useState<IPaymentMethod[]>([]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<number>();
    useEffect(() => {
        fetchPaymentMethods();
    }, []);

    const handlePaymentMethodSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPaymentMethod(parseInt(event.target.value)); // Update the state with the selected value
    };

    const placeOrder = async() => {
        setPaymentInProgress(true);
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
        }).then(response => response.json()).finally(() =>
            setTimeout(() => {
                setPaymentInProgress(false);
                if (response.success == "true") {
                    cartStore.clearCart();
                    navigate("/admin/payment-successful");
                } else {
                    notificationStore.error(response.message);
                }
            }, 3000));
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
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">${formattedPrice(product.price ?? 0)}</dd>
                        </div>
                    ))}
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-xl font-bold leading-6 text-gray-900">Total</dt>
                        <dd className="mt-1 text-xl leading-6 font-bold text-gray-700 sm:col-span-2 sm:mt-0">${formattedPrice(cartStore.total)}</dd>
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
                    className={`rounded-md ${paymentInProgress ? "bg-blue-600 hover:bg-blue-600 text-white hover:text-white": "bg-gray-200 text-gray-800 hover:text-blue-700 hover:bg-blue-100"} px-3 py-2 text-sm font-semibold shadow-sm transition-colors ease-linear duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                >
                    {paymentInProgress ? (
                        <>
                            <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin"
                                 viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="#E5E7EB"/>
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentColor"/>
                            </svg>
                            <span>Your payment is in progress...</span>
                        </>
                    ): (
                        <span>Pay now</span>
                    )}
                </button>
            </div>
        </div>
    )
}

export default observer(OrderPayment);