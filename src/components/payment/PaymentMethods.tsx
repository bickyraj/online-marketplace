import {useEffect, useState} from "react";
import PaymentMethodsStore from "../../store/PaymentMethodsStore.ts";
import {observer} from "mobx-react-lite";
interface IPaymentMethod {
    id: number;
    cardDetail: IPaymentCard;

}

interface IPaymentCard {
    cardNumber: number;
    expiryYear: number;
    expiryMonth: number;
}
const PaymentMethods: React.FC = () => {
    const paymethodStore = PaymentMethodsStore;
    const [paymentMethods, setPaymentMethods] = useState<IPaymentMethod[]>([]);
    useEffect(() => {
        const fetchPaymentMethods = async () => {
            await paymethodStore.getMyPaymentMethods(); // Wait for the promise to resolve
            setPaymentMethods(paymethodStore.paymentMethods); // Update state
        };
        fetchPaymentMethods();
    }, []);
    return (
        <>
            <div className="grid grid-cols-3 gap-4">
                <div
                    className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="/admin/add-payment-method">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Your payment methods
                        </h5>
                    </a>
                    {/*<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Your list of payment methods</p>*/}
                    <a href="/admin/add-payment-method"
                       className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Add new payment method
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </a>
                </div>

                {paymentMethods.length > 0 && (
                    paymentMethods.map((paymentMethod: IPaymentMethod) => (
                        <div key={paymentMethod.id} className="max-w-sm rounded overflow-hidden shadow-lg">
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">**** **** **** {paymentMethod.cardDetail.cardNumber}</div>
                                {/*<p className="text-gray-700 text-base">*/}
                                {/*    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores*/}
                                {/*    et perferendis eaque, exercitationem praesentium nihil.*/}
                                {/*</p>*/}
                            </div>
                            <div className="px-6 pt-4 pb-2">
                                <span
                                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                    Exp - {paymentMethod.cardDetail.expiryMonth}/{paymentMethod.cardDetail.expiryYear}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}

export default observer(PaymentMethods);