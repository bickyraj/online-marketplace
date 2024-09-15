import {observer} from "mobx-react-lite";
import cartStore from "../../../store/CartStore.ts";

const OrderPayment: React.FC = () => {
    return (
        <div>
            <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-gray-900">Applicant Information</h3>
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
            <div className="grid container">
                <button
                    type="submit"
                    className="rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-800 hover:text-white shadow-sm hover:bg-green-600 transition-colors ease-linear duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Place Order
                </button>
            </div>
        </div>
    )
}

export default observer(OrderPayment);