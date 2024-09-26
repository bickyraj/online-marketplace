import {Dialog, DialogBackdrop, DialogPanel, DialogTitle} from "@headlessui/react";
import {XMarkIcon} from "@heroicons/react/24/outline";
import React from "react";
import CartStore from "../../store/CartStore.ts";
import {observer} from "mobx-react-lite";
import {formattedPrice} from "../../utils/PriceUtil.ts";

interface IProps {
    open: boolean;
    onClose: (open: boolean) => void;
}


const CartDrawer: React.FC<IProps> = (props) =>  {
    const cartStore = CartStore;
    return (
        <Dialog open={props.open} onClose={props.onClose} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
            />

            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <DialogPanel
                            transition
                            className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
                        >
                            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        <DialogTitle className="text-lg font-medium text-gray-900">Shopping
                                            cart</DialogTitle>
                                        <div className="ml-3 flex h-7 items-center">
                                            <button
                                                type="button"
                                                onClick={() => props.onClose(false)}
                                                className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                            >
                                                <span className="absolute -inset-0.5"/>
                                                <span className="sr-only">Close panel</span>
                                                <XMarkIcon aria-hidden="true" className="h-6 w-6"/>
                                            </button>
                                        </div>
                                    </div>

                                    {cartStore.itemCount < 1 && (
                                        <div
                                            className="mt-48 flex md:flex-row md:justify-center justify-items-center px-5 text-gray-500">
                                            <div className="max-w-md">
                                                <div className="text-3xl font-dark font-semibold">Oops..</div>
                                                <p
                                                    className="text-2xl mb-2 font-medium md:text-2xl leading-normal"
                                                >Let's add some item. </p>
                                                <a
                                                    href="/admin/products"
                                                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                                >
                                                    Let's go
                                                </a>
                                            </div>
                                        </div>
                                    )}

                                    <div className="mt-8">
                                        <div className="flow-root">
                                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                            {cartStore.cartProducts.map((product, index) => (
                                                    <li key={index} className="flex py-6">
                                                        <div
                                                            className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                            {/*<img*/}
                                                            {/*    alt={product.name}*/}
                                                            {/*    src={product.name}*/}
                                                            {/*    className="h-full w-full object-cover object-center"*/}
                                                            {/*/>*/}
                                                        </div>

                                                        <div className="ml-4 flex flex-1 flex-col">
                                                            <div>
                                                                <div
                                                                    className="flex justify-between text-base font-medium text-gray-900">
                                                                    <h3>
                                                                        <a href={product.name}>{product.name}</a>
                                                                    </h3>
                                                                    <p className="ml-4">${formattedPrice(product.price ?? 0)}</p>
                                                                </div>
                                                                {/*<p className="mt-1 text-sm text-gray-500">{product.color}</p>*/}
                                                            </div>
                                                            <div
                                                                className="flex flex-1 items-end justify-between text-sm">
                                                                <p className="text-gray-500">Qty 1</p>

                                                                <div className="flex">
                                                                    <button onClick={() => {
                                                                        cartStore.removeItem(product);
                                                                    }} type="button"
                                                                            className="font-medium text-indigo-600 hover:text-indigo-500">
                                                                        Remove
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {cartStore.itemCount > 0  && (
                                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <p>Subtotal</p>
                                            <p>${formattedPrice(cartStore.total)}</p>
                                        </div>
                                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at
                                            checkout.</p>
                                        <div className="mt-6">
                                            <a
                                                href="/admin/checkout"
                                                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                            >
                                                Checkout
                                            </a>
                                        </div>
                                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                            <p>
                                                or{' '}
                                                <button
                                                    type="button"
                                                    onClick={() => props.onClose(false)}
                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                >
                                                    Continue Shopping
                                                    <span aria-hidden="true"> &rarr;</span>
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}

export default observer(CartDrawer);