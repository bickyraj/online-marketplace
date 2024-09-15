import {observer} from "mobx-react-lite";
import cartStore from "../../../store/CartStore.ts";

const OrderPayment: React.FC = () => {
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
                            name="push-notifications"
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
                            name="push-notifications"
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
            <div className="grid container">
                <button
                    type="submit"
                    className="rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-800 hover:text-white shadow-sm hover:bg-green-600 transition-colors ease-linear duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Confirm Payment
                </button>
            </div>
        </div>
    )
}

export default observer(OrderPayment);